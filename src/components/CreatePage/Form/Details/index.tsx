import { memo } from 'react'

import { Field, Hint, Input, Label } from '../../../UI/Forms'
import Store from '../../Store'
import { Header, Wrapper } from '../styles'

const Details = () => {
  // context store state
  const name = Store.useStoreState((state) => state.name)
  const symbol = Store.useStoreState((state) => state.symbol)
  const decimals = Store.useStoreState((state) => state.decimals)

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
          <Input
            value={name}
            onChange={(e) =>
              setState({ key: 'name', data: e.currentTarget.value })
            }
          />
        </Field>
        <Field>
          <Label>Symbol</Label>
          <Hint>May contain digits. 3-6 characters long.</Hint>
          <Input
            value={symbol}
            onChange={(e) => setSymbol(e.currentTarget.value)}
            uppercase
          />
        </Field>
        <Field>
          <Label>Decimals</Label>
          <Hint>
            Decimal precision of your token. E.g. SCRT uses 6, ETH uses 18.
          </Hint>
          <Input
            value={decimals}
            onChange={(e) => setDecimals(e.currentTarget.value)}
          />
        </Field>
      </Wrapper>
    </>
  )
}

export default memo(Details)
