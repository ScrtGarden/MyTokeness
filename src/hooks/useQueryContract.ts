import { QueryKey, UseQueryOptions, useQuery } from 'react-query'

import { queryChain } from '../../utils/secretjs'

const useQueryContract = <T extends object, K extends object, A = unknown>(
  key: QueryKey,
  contractAddress: string,
  queryMsg: T,
  options?: UseQueryOptions<K, Error, A>
) =>
  useQuery(
    key,
    () => queryChain.queryContractSmart(contractAddress, queryMsg),
    options
  )

export default useQueryContract
