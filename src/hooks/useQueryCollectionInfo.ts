import { UseQueryResult, useQuery } from 'react-query'

import { ResultContractInfo } from '../../interface/nft'
import { queryChain } from '../../utils/secretjs'

const collectionInfoQueryKey = (contractAddress: string): string[] => [
  'collectionInfo',
  contractAddress,
]

const useQueryCollectionInfo = (
  contractAddress: string
): UseQueryResult<ResultContractInfo, Error> =>
  useQuery(
    collectionInfoQueryKey(contractAddress),
    () => queryChain.queryContractSmart(contractAddress, { contract_info: {} }),
    { refetchOnWindowFocus: false }
  )

export { useQueryCollectionInfo as default, collectionInfoQueryKey }
