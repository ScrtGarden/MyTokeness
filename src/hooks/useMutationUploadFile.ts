import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

import { UploadFileResult } from '../../interface/api'
import { fetcher } from '../../utils/graphqlRequest'

const mutateUploadFile = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      ipfsLink
    }
  }
`

const useMutationUploadFile = () =>
  useMutation<UploadFileResult, Error, { file: File }>(
    (variables) => fetcher(mutateUploadFile, variables),
    {}
  )

export default useMutationUploadFile
