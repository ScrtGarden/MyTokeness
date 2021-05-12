import { UseMutationResult, useMutation } from 'react-query'

import keplr from '../../utils/keplr'

const useMutationSuggestToken = (): UseMutationResult<void, Error, string> =>
  useMutation((contractAddress: string) => keplr.suggestToken(contractAddress))

export default useMutationSuggestToken
