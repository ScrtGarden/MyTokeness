import { UseQueryOptions, useQuery } from 'react-query'

import { ResultTokenInfo } from '../../interface/snip20'
import { queryChain } from '../../utils/secretjs'

const useQuerySnip20Info = (
  contractAddress: string,
  options?: UseQueryOptions<ResultTokenInfo, Error>
) =>
  useQuery(
    ['tokenInfo', contractAddress],
    () => queryChain.queryContractSmart(contractAddress, { token_info: {} }),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      ...options,
    }
  )

export default useQuerySnip20Info
