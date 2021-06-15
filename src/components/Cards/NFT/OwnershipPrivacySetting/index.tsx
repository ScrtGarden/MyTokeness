import { FC, memo } from 'react'

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
  error,
}) => {
  const onSubmit = () => {
    //
  }

  return (
    <ApprovalPrivacySetting
      id="ownership"
      title="Ownership privacy setting"
      description="Turning this off will allow anyone see you own this asset."
      isPrivate={isPrivate}
      expiration={expiration}
      error={error}
      toggleLabel="Hide ownership"
      toggle={toggle}
      onSubmit={onSubmit}
      loading={false}
    />
  )
}

export default memo(OwnershipPrivacySetting)
