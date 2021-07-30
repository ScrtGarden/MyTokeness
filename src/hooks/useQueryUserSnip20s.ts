import { UseQueryResult, useQuery } from 'react-query'

import { ResultTokenInfo, TokenInfo } from '../../interface/snip20'
import { CONTRACT_CODE_ID } from '../../utils/constants'
import { queryChain } from '../../utils/secretjs'

interface UserSnip20 extends Partial<TokenInfo> {
  address: string
}

const useQueryUserSnip20s = (
  walletAddress: string
): UseQueryResult<UserSnip20[], Error> => {
  return useQuery(
    ['snip20s', walletAddress],
    async () => fetchSnip20s(walletAddress),
    { enabled: !!walletAddress, refetchOnWindowFocus: true }
  )
}

const fetchSnip20s = async (walletAddress: string) => {
  try {
    const snip20Contracts = await queryChain.getContracts(
      CONTRACT_CODE_ID.SNIP20
    )

    const filteredContracts = snip20Contracts.filter(
      (contract) => contract.creator === walletAddress
    )

    return Promise.all(
      filteredContracts.map(async (contract) => {
        const snip20Info: ResultTokenInfo = await queryChain.queryContractSmart(
          contract.address,
          { token_info: {} }
        )

        return {
          address: contract.address,
          name: snip20Info.token_info.name,
          symbol: snip20Info.token_info.symbol,
        }
      })
    )
  } catch (error) {
    throw error
  }
}

export default useQueryUserSnip20s
