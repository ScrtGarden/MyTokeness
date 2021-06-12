import { UseMutationResult, useMutation, useQueryClient } from 'react-query'
import { ExecuteResult } from 'secretjs'

import {
  Expiration,
  ResultInventoryApprovals,
  SetWhitelistedApproval,
  Snip721Approval,
} from '../../interface/nft'
import { MAX_GAS } from '../../utils/constants'
import { executeContract } from '../../utils/contractInteractions'

const useMutationWhitelist = (
  walletAddress: string,
  contractAddress: string
): UseMutationResult<ExecuteResult, Error, SetWhitelistedApproval> => {
  const queryClient = useQueryClient()

  return useMutation(
    (data: SetWhitelistedApproval) =>
      executeContract({
        contractAddress,
        maxGas: MAX_GAS.NFT.SET_WHITELIST_APPROVAL,
        handleMsg: { set_whitelisted_approval: data },
      }),
    {
      onSuccess: (_, data) => {
        const key = ['inventoryApprovals', walletAddress, contractAddress]
        const original = queryClient.getQueryData<ResultInventoryApprovals>(key)

        if (original) {
          const { inventory_approvals } = original.inventory_approvals
          const updatedApprovals = updateTokenApprovals(
            inventory_approvals,
            data
          )

          queryClient.setQueryData<ResultInventoryApprovals>(key, {
            inventory_approvals: {
              ...original.inventory_approvals,
              inventory_approvals: updatedApprovals,
            },
          })
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['nativeBalance', walletAddress])
      },
    }
  )
}

const updateTokenApprovals = (
  tokens: Snip721Approval[],
  toBeApproved: SetWhitelistedApproval
): Snip721Approval[] => {
  const formatted = formatToSnip721Approval(toBeApproved)
  const {
    address,
    view_owner_expiration,
    view_private_metadata_expiration,
    transfer_expiration,
  } = formatted

  const isWhitelisted = tokens.some((approved) => approved.address === address)

  if (!isWhitelisted) {
    return tokens.concat([formatted])
  }

  return tokens.reduce((acc: Snip721Approval[], approved) => {
    if (approved.address === address) {
      if (
        view_owner_expiration === null &&
        view_private_metadata_expiration === null &&
        transfer_expiration === null
      ) {
        return acc
      } else {
        return acc.concat([formatted])
      }
    }
    return acc.concat([approved])
  }, [])
}

const formatToSnip721Approval = ({
  address,
  view_owner,
  view_private_metadata,
  transfer,
  expires,
}: SetWhitelistedApproval): Snip721Approval => ({
  address,
  view_owner_expiration: view_owner === 'all' ? (expires as Expiration) : null,
  view_private_metadata_expiration:
    view_private_metadata === 'all' ? (expires as Expiration) : null,
  transfer_expiration: transfer === 'all' ? (expires as Expiration) : null,
})

export default useMutationWhitelist
