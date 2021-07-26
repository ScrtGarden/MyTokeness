import cryptoRandomString from 'crypto-random-string'
import { FileUpload } from 'graphql-upload'
import { File, NFTStorage } from 'nft.storage'

import { encrypt } from '../../../utils/fileEncryption'
import streamToBuffer from '../../../utils/streamToBuffer'

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY as string })

export const resolvers = {
  Mutation: {
    uploadFile: async (
      _: unknown,
      args: { file: FileUpload; encrypt?: boolean }
    ): Promise<{ ipfsLink: URL; key?: string }> => {
      try {
        const file = await args.file
        const { createReadStream, filename } = file
        const fileStream = createReadStream()
        fileStream.path = filename

        let encryptedBuffer: Buffer | undefined
        let key: string | undefined
        const buffer = await streamToBuffer(fileStream)

        if (args.encrypt) {
          console.log(filename, encrypt)
          key = cryptoRandomString({ length: 21 })
          encryptedBuffer = encrypt(buffer, key)
        }

        const {
          data: { image },
        } = await client.store({
          name: filename,
          description: '',
          // hotfix -- type is hardcoded, should be dynamic? e.g. videos / audios.
          // keep track @ https://github.com/ipfs-shipyard/nft.storage
          image: new File([encryptedBuffer || buffer], filename, {
            type: 'image/*',
          }),
        })

        return { ipfsLink: image, key }
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
