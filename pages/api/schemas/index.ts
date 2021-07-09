import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type UploadFileResult {
    ipfsLink: String
    key: String
  }

  type Query {
    empty: Boolean
  }

  type Mutation {
    uploadFile(file: Upload!, encrypt: Boolean, test: String): UploadFileResult
  }
`
