import axios from 'axios'
import FormData from 'form-data'
import { FileUpload } from 'graphql-upload'

export const resolvers = {
  Mutation: {
    uploadFile: async (_: any, args: { file: FileUpload }) => {
      try {
        const file = await args.file
        const { createReadStream, filename, mimetype } = file
        const fileStream = createReadStream()
        fileStream.path = filename

        let data = new FormData()
        data.append('file', fileStream)

        // metadata options
        const metadata = JSON.stringify({
          keyvalues: {
            filename,
            mimetype,
          },
        })
        data.append('pinataMetadata', metadata)

        // pinata options
        const pinataOptions = JSON.stringify({
          wrapWithDirectory: true,
        })
        data.append('pinataOptions', pinataOptions)

        const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
        const config = {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
            'Content-Type': `multipart/form-data; boundary=${data.getBoundary()}`,
          },
        }

        const response = await axios.post(url, data, config)

        return response.data
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
