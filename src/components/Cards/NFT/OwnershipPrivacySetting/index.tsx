import { FC, memo, useState } from 'react'

import { HandleSetGlobalApproval } from '../../../../../interface/nft'
import { UIExpiration } from '../../../../../interface/nft-ui'
import useMutationExeContract from '../../../../hooks/useMutationExeContract'
import { validate } from '../../../CollectionPage/Settings/Privacy/lib'
import ApprovalPrivacySetting, {
  Props as ApprovalSettingProps,
} from '../../../Modals/ApprovalPrivacySetting'

type Props = {
  tokenId: string
  contractAddress: string
} & Omit<ApprovalSettingProps, 'onSubmit'>

const OwnershipPrivacySetting: FC<Props> = ({
  toggle,
  isPrivate,
  expiration,
}) => {
  // component state
  const [errors, setErrors] = useState({ option: '', value: '' })

  // custom hooks
  const { mutate } = useMutationExeContract<HandleSetGlobalApproval>()

  const onSubmit = (hideOwnership: boolean, exp: UIExpiration) => {
    const validation = validate(hideOwnership, exp)
    setErrors(validation.errors)

    if (validation.hasError) {
      return
    }
  }

  return (
    <ApprovalPrivacySetting
      id="ownership"
      title="Ownership privacy setting"
      description="Turning this off will allow anyone see you own this asset."
      isPrivate={isPrivate}
      expiration={expiration}
      errors={errors}
      toggleLabel="Hide ownership"
      toggle={toggle}
      onSubmit={onSubmit}
      loading={false}
    />
  )
}

export default memo(OwnershipPrivacySetting)
