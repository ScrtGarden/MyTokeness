import { FC, memo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import {
  Expiration,
  HandleSetGlobalApproval,
  ResultInventoryApprovals,
} from '../../../../../../interface/nft'
import { MAX_GAS } from '../../../../../../utils/constants'
import parseErrorMsg from '../../../../../../utils/parseErrorMsg'
import useMutationExeContract from '../../../../../hooks/useMutationExeContract'
import ApprovalSetting from '../../../../Cards/ApprovalSetting'
import { FormatExpiration } from '../../../../Cards/ApprovalSetting/lib'
import { format, validate } from '../lib'

type Props = {
  isPrivate: boolean
  expiration: Expiration
  contractAddress: string
  walletAddress: string
}

const OwnershipPrivacySetting: FC<Props> = ({
  isPrivate,
  expiration,
  contractAddress,
  walletAddress,
}) => {
  const queryClient = useQueryClient()

  // custom hooks
  const { mutate, isLoading } =
    useMutationExeContract<HandleSetGlobalApproval>()

  // component state
  const [error, setError] = useState('')

  const onSave = (isPrivate: boolean, expSettings: FormatExpiration) => {
    const result = validate(isPrivate, expSettings)

    setError(result)

    if (result) {
      return
    }

    const handleMsg = format(isPrivate, expSettings, true)

    mutate(
      {
        contractAddress,
        handleMsg,
        maxGas: MAX_GAS.NFT.SET_GLOBAL_APPROVAL,
      },
      {
        onSuccess: () => {
          const key = ['inventoryApprovals', walletAddress, contractAddress]
          const original =
            queryClient.getQueryData<ResultInventoryApprovals>(key)

          const update = {
            owner_is_public: !isPrivate,
            public_ownership_expiration: isPrivate
              ? null
              : handleMsg.set_global_approval.expires,
          }

          queryClient.setQueriesData(key, {
            inventory_approvals: {
              ...original?.inventory_approvals,
              ...update,
            },
          })
          toast.success('Updated ownership privacy setting.')
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  return (
    <ApprovalSetting
      title="Ownership Privacy Setting"
      description="Turning this off will allow anyone see which assets you own."
      isPrivate={isPrivate}
      expiration={expiration}
      toggleId="ownership"
      toggleLabel="Hide ownership"
      onSubmit={onSave}
      error={error}
      loading={isLoading}
    />
  )
}

export default memo(OwnershipPrivacySetting)
