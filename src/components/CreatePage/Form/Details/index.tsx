import { memo } from 'react'

import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Header, Wrapper } from '../../../UI/Card'
import { Field, Hint, Input, Label } from '../../../UI/Forms'
import Store from '../../Store'

const Details = () => {
  // context store state
  const name = Store.useStoreState((state) => state.name)
  const symbol = Store.useStoreState((state) => state.symbol)
  const decimals = Store.useStoreState((state) => state.decimals)
  const errors = Store.useStoreState((state) => state.validation)

  // context store actions
  const setState = Store.useStoreActions((actions) => actions.setState)
  const setSymbol = Store.useStoreActions((actions) => actions.setSymbol)
  const setDecimals = Store.useStoreActions((actions) => actions.setDecimals)

  return (
    <>
      <Header>Details</Header>
      <Wrapper>
        <Field>
          <Label>Name</Label>
          <Hint>Must be 3-30 characters long.</Hint>
          <Input
            value={name}
            onChange={(e) =>
              setState({ key: 'name', data: e.currentTarget.value })
            }
            maxLength={30}
            placeholder="MyTokeness"
          />
          {errors.name && (
            <MessageWithIcon validation="error" message={errors.name} />
          )}
        </Field>
        <Field>
          <Label>Symbol</Label>
          <Hint>Must be 3-6 characters long. Alphabetical letters only.</Hint>
          <Input
            value={symbol}
            onChange={(e) => setSymbol(e.currentTarget.value)}
            uppercase
            placeholder="MYTOKN"
          />
          {errors.symbol && (
            <MessageWithIcon validation="error" message={errors.symbol} />
          )}
        </Field>
        <Field>
          <Label>Decimals</Label>
          <Hint>
            Decimal precision of your token. E.g. SCRT uses 6, ETH uses 18.
            Enter number between 1-18.
          </Hint>
          <Input
            value={decimals}
            onChange={(e) => setDecimals(e.currentTarget.value)}
            placeholder="6"
          />
          {errors.decimals && (
            <MessageWithIcon validation="error" message={errors.decimals} />
          )}
        </Field>
      </Wrapper>
    </>
  )
}

export default memo(Details)
