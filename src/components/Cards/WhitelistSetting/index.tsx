import { FC, memo } from 'react'

import { Snip721Approval } from '../../../../interface/nft'
import { Header, SettingsCard } from '../../UI/Card'
import AddNew from './AddNew'
import { Props as AddNewProps } from './AddNew'

type Props = {
  list: Snip721Approval[]
} & AddNewProps

const WhitelistSetting: FC<Props> = ({
  list,
  address,
  setAddress,
  options,
  setOptions,
  expiration,
  setExpiration,
}) => {
  return (
    <SettingsCard>
      <Header>Whitelist Setting</Header>
      <AddNew
        address={address}
        setAddress={setAddress}
        options={options}
        setOptions={setOptions}
        expiration={expiration}
        setExpiration={setExpiration}
      />
    </SettingsCard>
  )
}

export default memo(WhitelistSetting)
