import { FileUpload } from 'graphql-upload'
import { File, NFTStorage } from 'nft.storage'

import streamToBuffer from '../../../utils/streamToBuffer'

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY as string })

export const resolvers = {
  Mutation: {
    uploadFile: async (_: any, args: { file: FileUpload }) => {
      try {
        const file = await args.file
        const { createReadStream, filename, mimetype } = file
        const fileStream = createReadStream()
        fileStream.path = filename

        const result = await streamToBuffer(fileStream)

        const {
          data: { image },
        } = await client.store({
          name: filename,
          description: '',
          image: new File([result], filename, { type: mimetype }),
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
    empty: async () => true,
  },
}
