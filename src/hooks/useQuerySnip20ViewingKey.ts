import { UseQueryOptions, useQuery } from 'react-query'

import keplr from '../../utils/keplr'

interface Variables {
  contractAddress: string
  walletAddress: string
}

const useQuerySnip20ViewingKey = (
  { contractAddress, walletAddress }: Variables,
  options?: UseQueryOptions<string, Error>
) => {
  return useQuery(
    ['viewingKey', walletAddress, contractAddress],
    () => keplr.getSnip20ViewingKey(contractAddress),
    { refetchOnWindowFocus: false, ...options }
  )
}

export default useQuerySnip20ViewingKey
