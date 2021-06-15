import { FC, memo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { HandleSetGlobalApproval } from '../../../../../interface/nft'
import { UIExpiration } from '../../../../../interface/nft-ui'
import { MAX_GAS } from '../../../../../utils/constants'
import parseErrorMsg from '../../../../../utils/parseErrorMsg'
import useMutationExeContract from '../../../../hooks/useMutationExeContract'
import {
  ValidationError,
  format,
  validate,
} from '../../../CollectionPage/Settings/Privacy/lib'
import ApprovalPrivacySetting, {
  Props as ApprovalSettingProps,
} from '../../../Modals/ApprovalPrivacySetting'

type Props = {
  tokenId: string
  contractAddress: string
} & Omit<ApprovalSettingProps, 'onSubmit' | 'title' | 'id'>

const ContentsPrivacySetting: FC<Props> = ({
  tokenId,
  contractAddress,
  toggle,
  isPrivate,
  expiration,
}) => {
  const queryClient = useQueryClient()

  // component state
  const [errors, setErrors] = useState<ValidationError | undefined>()

  // custom hooks
  const { mutate, isLoading } =
    useMutationExeContract<HandleSetGlobalApproval>()

  const onSubmit = (hideOwnership: boolean, exp: UIExpiration) => {
    const validation = validate(hideOwnership, exp)
    setErrors(validation.errors)

    if (validation.hasError) {
      return
    }

    const handleMsg = format(hideOwnership, exp, {
      tokenId,
    })

    mutate(
      {
        contractAddress,
        maxGas: MAX_GAS.NFT.SET_GLOBAL_APPROVAL_TOKEN,
        handleMsg,
      },
      {
        onSuccess: (_, { handleMsg: { set_global_approval } }) => {
          const { view_private_metadata } = set_global_approval
          const isHidden = view_private_metadata === 'revoke_token'
          queryClient.invalidateQueries([
            'nftDossier',
            contractAddress,
            tokenId,
          ])
          toast.success(
            `Contents of asset are now ${isHidden ? 'hidden' : 'public'}. `
          )
          toggle()
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  return (
    <ApprovalPrivacySetting
      title="Private contents privacy setting"
      description="Turning this off will allow anyone see the asset's private contents."
      id="privateContents"
      isPrivate={isPrivate}
      expiration={expiration}
      errors={errors}
      toggleLabel="Hide private contents"
      toggle={toggle}
      onSubmit={onSubmit}
      loading={isLoading}
    />
  )
}

export default memo(ContentsPrivacySetting)
