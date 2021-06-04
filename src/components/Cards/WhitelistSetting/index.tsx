import { FC, memo } from 'react'

import { Snip721Approval } from '../../../../interface/nft'
import { Header, SettingsCard, Wrapper } from '../../UI/Card'
import { Text } from '../../UI/Typography'
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
  onAdd,
  loading,
  addErrors,
}) => (
  <SettingsCard>
    <Header>Whitelist Setting</Header>
    <Wrapper>
      <Text>
        Grant an address permission to view ownership, view private metadata,
        and/or to transfer every token in the owner's inventory.
      </Text>
      <AddNew
        address={address}
        setAddress={setAddress}
        options={options}
        setOptions={setOptions}
        expiration={expiration}
        setExpiration={setExpiration}
        onAdd={onAdd}
        loading={loading}
        addErrors={addErrors}
      />
    </Wrapper>
  </SettingsCard>
)

export default memo(WhitelistSetting)
