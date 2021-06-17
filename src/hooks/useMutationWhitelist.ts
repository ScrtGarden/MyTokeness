import {
  QueryClient,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from 'react-query'
import { ExecuteResult } from 'secretjs'

import {
  Expiration,
  ResultInventoryApprovals,
  ResultNFTDossier,
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
        const { token_id } = data
        !!token_id
          ? invalidateTokenApprovals(
              walletAddress,
              contractAddress,
              queryClient,
              data
            )
          : invalidateInventoryApprovals(
              walletAddress,
              contractAddress,
              queryClient,
              data
            )
      },
      onSettled: () => {
        queryClient.invalidateQueries(['nativeBalance', walletAddress])
      },
    }
  )
}

const invalidateTokenApprovals = (
  walletAddress: string,
  contractAddress: string,
  queryClient: QueryClient,
  data: SetWhitelistedApproval
) => {
  const { token_id } = data
  const key = ['nftDossier', walletAddress, contractAddress, token_id]
  const original = queryClient.getQueryData<ResultNFTDossier>(key)

  if (original) {
    const { token_approvals } = original.nft_dossier
    const updatedApprovals = updateTokenApprovals(token_approvals, data)

    queryClient.setQueryData<ResultNFTDossier>(key, {
      nft_dossier: {
        ...original.nft_dossier,
        token_approvals: updatedApprovals,
      },
    })
  }
}

const invalidateInventoryApprovals = (
  walletAddress: string,
  contractAddress: string,
  queryClient: QueryClient,
  data: SetWhitelistedApproval
) => {
  const key = ['inventoryApprovals', walletAddress, contractAddress]
  const original = queryClient.getQueryData<ResultInventoryApprovals>(key)

  if (original) {
    const { inventory_approvals } = original.inventory_approvals
    const updatedApprovals = updateTokenApprovals(inventory_approvals, data)

    queryClient.setQueryData<ResultInventoryApprovals>(key, {
      inventory_approvals: {
        ...original.inventory_approvals,
        inventory_approvals: updatedApprovals,
      },
    })
  }
}

const updateTokenApprovals = (
  tokens: Snip721Approval[],
  toBeApproved: SetWhitelistedApproval
): Snip721Approval[] => {
  const formatted = formatToSnip721Approval(toBeApproved)
  console.log({ formatted, tokens })
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
  token_id,
}: SetWhitelistedApproval): Snip721Approval => {
  const selectedValue = !!token_id ? 'approve_token' : 'all'

  return {
    address,
    view_owner_expiration:
      view_owner === selectedValue ? (expires as Expiration) : null,
    view_private_metadata_expiration:
      view_private_metadata === selectedValue ? (expires as Expiration) : null,
    transfer_expiration:
      transfer === selectedValue ? (expires as Expiration) : null,
  }
}

export default useMutationWhitelist
