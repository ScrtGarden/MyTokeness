import { QueryKey, UseQueryOptions, useQuery } from 'react-query'

import { queryChain } from '../../utils/secretjs'

const useQueryContract = <T extends object, K extends object>(
  key: QueryKey,
  contractAddress: string,
  queryMsg: T,
  options?: UseQueryOptions<K, Error>
) =>
  useQuery(
    key,
    () => queryChain.queryContractSmart(contractAddress, queryMsg),
    options
  )

export default useQueryContract
