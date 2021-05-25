import { memo } from 'react'

import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Header, Wrapper } from '../../../UI/Card'
import { Field, Hint, Input, Label, ToggleField } from '../../../UI/Forms'
import Toggle from '../../../UI/Forms/Toggle'
import Store from '../../Store'

const Configuration = () => {
  // context store state
  const adminAddress = Store.useStoreState((state) => state.adminAddress)
  const enablePublicTokenSupply = Store.useStoreState(
    (state) => state.enablePublicTokenSupply
  )
  const enableDeposit = Store.useStoreState((state) => state.enableDeposit)
  const enableRedeem = Store.useStoreState((state) => state.enableRedeem)
  const enableMint = Store.useStoreState((state) => state.enableMint)
  const enableBurn = Store.useStoreState((state) => state.enableBurn)
  const error = Store.useStoreState((state) => state.validation.adminAddress)

  // context store actions
  const setState = Store.useStoreActions((actions) => actions.setState)

  return (
    <>
      <Header margin>Configuration</Header>
      <Wrapper>
        <Field>
          <Label>Admin wallet address (optional)</Label>
          <Hint>If left empty, will default to creator address.</Hint>
          <Input
            value={adminAddress}
            onChange={(e) =>
              setState({ key: 'adminAddress', data: e.currentTarget.value })
            }
            placeholder="secret1gvjcte2asddt09394s3r2aqhllgchg4608fmew"
          />
          {error && <MessageWithIcon validation="error" message={error} />}
        </Field>
        <ToggleField>
          <Label>Enable public token supply</Label>
          <Toggle
            id="enablePublicTokenSupply"
            checked={enablePublicTokenSupply}
            onChange={() =>
              setState({
                key: 'enablePublicTokenSupply',
                data: !enablePublicTokenSupply,
              })
            }
          />
        </ToggleField>
        <Field>
          <ToggleField>
            <Label disabled>Enable deposit</Label>
            <Toggle
              id="enableDeposit"
              checked={enableDeposit}
              onChange={() =>
                setState({
                  key: 'enableDeposit',
                  data: !enableDeposit,
                })
              }
              disabled
            />
          </ToggleField>
          <Hint disabled>
            If you enable this, you will be able to convert from SCRT to the
            token.
          </Hint>
        </Field>
        <Field>
          <ToggleField>
            <Label disabled>Enable redeem</Label>
            <Toggle
              id="enableRedeem"
              checked={enableRedeem}
              onChange={() =>
                setState({
                  key: 'enableRedeem',
                  data: !enableRedeem,
                })
              }
              disabled
            />
          </ToggleField>
          <Hint disabled>
            If you enable this, you will be able to redeem your token for SCRT.
          </Hint>
        </Field>
        <ToggleField>
          <Label>Enable mint</Label>
          <Toggle
            id="enableMint"
            checked={enableMint}
            onChange={() =>
              setState({
                key: 'enableMint',
                data: !enableMint,
              })
            }
          />
        </ToggleField>
        <ToggleField>
          <Label>Enable burn</Label>
          <Toggle
            id="enableBurn"
            checked={enableBurn}
            onChange={() =>
              setState({
                key: 'enableBurn',
                data: !enableBurn,
              })
            }
          />
        </ToggleField>
      </Wrapper>
    </>
  )
}

export default memo(Configuration)
