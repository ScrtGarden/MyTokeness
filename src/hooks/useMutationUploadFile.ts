import { gql } from 'graphql-request'
import { UseMutationResult, useMutation } from 'react-query'

import { UploadFileResult } from '../../interface/api'
import { fetcher } from '../../utils/graphqlRequest'

const mutateUploadFile = gql`
  mutation UploadFile($file: Upload!, $encrypt: Boolean) {
    uploadFile(file: $file, encrypt: $encrypt) {
      ipfsLink
      key
    }
  }
`

const useMutationUploadFile = (): UseMutationResult<
  UploadFileResult,
  Error,
  { file: File; encrypt?: boolean }
> => useMutation((variables) => fetcher(mutateUploadFile, variables), {})

export default useMutationUploadFile
