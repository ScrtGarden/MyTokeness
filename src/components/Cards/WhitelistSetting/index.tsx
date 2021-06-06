import { FC, memo } from 'react'

import { Header, SettingsCard, Wrapper } from '../../UI/Card'
import { Text } from '../../UI/Typography'
import AddNew from './AddNew'
import { Props as AddNewProps } from './AddNew'
import { Props as ApprovalListProps } from './ApprovalList'
import ApprovalList from './ApprovalList'

type Props = AddNewProps & ApprovalListProps

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
  errors,
}) => (
  <SettingsCard>
    <Header>Whitelist Setting</Header>
    <Wrapper>
      <Text>
        Grant an address permission to view ownership, view private metadata,
        and/or to transfer every token in the your inventory.
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
        errors={errors}
      />
    </Wrapper>
    <Header margin>Approved List</Header>
    <ApprovalList list={list} />
  </SettingsCard>
)

export default memo(WhitelistSetting)
