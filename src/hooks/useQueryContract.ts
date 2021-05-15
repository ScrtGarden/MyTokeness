import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from 'react-query'

import { queryClient } from '../../utils/secretjs'

const useQueryContract = <T extends object, K extends object>(
  key: QueryKey,
  contractAddress: string,
  queryMsg: T,
  options?: UseQueryOptions<K, Error>
): UseQueryResult<K, Error> =>
  useQuery(
    key,
    () => queryClient.queryContractSmart(contractAddress, queryMsg),
    options
  )

export default useQueryContract
