import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type UploadFileResult {
    IpfsHash: String
    PinSize: Int
    Timestamp: String
  }

  type Query {
    empty: Boolean
  }

  type Mutation {
    uploadFile(file: Upload!): UploadFileResult
  }
`
