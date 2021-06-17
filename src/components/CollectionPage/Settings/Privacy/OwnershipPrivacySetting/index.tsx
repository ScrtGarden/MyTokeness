import { FC, memo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import {
  HandleSetGlobalApproval,
  RInventoryApprovals,
  ResultInventoryApprovals,
} from '../../../../../../interface/nft'
import { UIExpiration } from '../../../../../../interface/nft-ui'
import { MAX_GAS } from '../../../../../../utils/constants'
import parseErrorMsg from '../../../../../../utils/parseErrorMsg'
import useMutationExeContract from '../../../../../hooks/useMutationExeContract'
import ApprovalSetting from '../../../../Cards/ApprovalSetting'
import { ValidationError, format, validate } from '../lib'

type Props = {
  isPrivate: boolean
  expiration: UIExpiration
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
  const [errors, setErrors] = useState<ValidationError | undefined>()

  const onSave = (isPrivate: boolean, expSettings: UIExpiration) => {
    const validation = validate(isPrivate, expSettings)

    setErrors(validation.errors)

    if (validation.hasError) {
      return
    }

    const handleMsg = format(isPrivate, expSettings, { isOwnership: true })

    mutate(
      {
        contractAddress,
        handleMsg,
        maxGas: MAX_GAS.NFT.SET_GLOBAL_APPROVAL,
      },
      {
        onSuccess: (_, { handleMsg: { set_global_approval } }) => {
          const key = ['inventoryApprovals', walletAddress, contractAddress]
          const original =
            queryClient.getQueryData<ResultInventoryApprovals>(key)

          if (original) {
            const { view_owner, expires } = set_global_approval
            const isPublic = view_owner === 'all'
            const update: Partial<RInventoryApprovals> = {
              owner_is_public: isPublic ? true : false,
              public_ownership_expiration: isPublic ? expires : null,
            }

            queryClient.setQueryData<ResultInventoryApprovals>(key, {
              inventory_approvals: {
                ...original.inventory_approvals,
                ...update,
              },
            })
          }

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
      title="Ownership Privacy Settings"
      description="Turning this off will allow anyone see which assets you own."
      isPrivate={isPrivate}
      expiration={expiration}
      toggleId="ownership"
      toggleLabel="Hide ownership"
      onSubmit={onSave}
      errors={errors}
      loading={isLoading}
    />
  )
}

export default memo(OwnershipPrivacySetting)
