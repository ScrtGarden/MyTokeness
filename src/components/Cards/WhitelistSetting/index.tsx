import { FC, memo } from 'react'

import { Snip721Approval } from '../../../../interface/nft'
import { Header, SettingsCard } from '../../UI/Card'
import AddNew from './AddNew'

type Props = {
  list: Snip721Approval[]
}

const WhitelistSetting: FC<Props> = ({ list }) => {
  return (
    <SettingsCard>
      <Header>Whitelist Setting</Header>
      <AddNew />
    </SettingsCard>
  )
}

export default memo(WhitelistSetting)
