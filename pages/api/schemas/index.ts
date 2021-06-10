import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type UploadFileResult {
    ipfsLink: String
  }

  type Query {
    empty: Boolean
  }

  type Mutation {
    uploadFile(file: Upload!): UploadFileResult
  }
`
