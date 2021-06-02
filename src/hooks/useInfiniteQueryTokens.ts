import { useInfiniteQuery } from 'react-query'

import { QueryTokens, ResultTokens } from '../../interface/nft'
import { queryChain } from '../../utils/secretjs'

const useInfiniteQueryTokens = (
  walletAddress: string,
  contractAddress: string,
  queryMsg: QueryTokens['tokens']
) => {
  return useInfiniteQuery<ResultTokens, Error>(
    ['tokens', walletAddress, contractAddress],
    ({ pageParam = '' }) =>
      queryChain.queryContractSmart(contractAddress, {
        tokens: { ...queryMsg, start_after: pageParam },
      }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        const length = lastPage.token_list.tokens.length
        const limit = queryMsg.limit || 10
        return length < limit
          ? undefined
          : lastPage.token_list.tokens[length - 1]
      },

      enabled: !!queryMsg.viewing_key,
      retry: false,
    }
  )
}

export default useInfiniteQueryTokens
