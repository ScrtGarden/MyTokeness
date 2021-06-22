import { FileUpload } from 'graphql-upload'
import { File, NFTStorage } from 'nft.storage'

import streamToBuffer from '../../../utils/streamToBuffer'

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY as string })

export const resolvers = {
  Mutation: {
    uploadFile: async (
      _: unknown,
      args: { file: FileUpload }
    ): Promise<{ ipfsLink: URL }> => {
      try {
        const file = await args.file
        const { createReadStream, filename } = file
        const fileStream = createReadStream()
        fileStream.path = filename

        const result = await streamToBuffer(fileStream)

        const {
          data: { image },
        } = await client.store({
          name: filename,
          description: '',
          // hotfix -- type is hardcoded, should be dynamic? e.g. videos / audios.
          // keep track @ https://github.com/ipfs-shipyard/nft.storage
          image: new File([result], filename, { type: 'image/*' }),
        })

        return { ipfsLink: image }
      } catch (error) {
        console.log('*** uploadFile error ***')
        console.log(error)
        throw error
      }
    },
  },
  Query: {
    empty: async (): Promise<boolean> => true,
  },
}
