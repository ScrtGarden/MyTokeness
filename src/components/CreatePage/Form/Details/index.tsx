import { memo } from 'react'

import { Field, Input, Label } from '../../../UI/Forms'
import Store from '../../Store'
import { Header, Wrapper } from '../styles'

const Details = () => {
  // context store state
  const name = Store.useStoreState((state) => state.name)
  const symbol = Store.useStoreState((state) => state.symbol)
  const decimals = Store.useStoreState((state) => state.decimals)

  // context store actions
  const setState = Store.useStoreActions((actions) => actions.setState)

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
          <Input
            value={symbol}
            onChange={(e) =>
              setState({ key: 'symbol', data: e.currentTarget.value })
            }
          />
        </Field>
        <Field>
          <Label>Decimals</Label>
          <Input
            value={decimals}
            onChange={(e) =>
              setState({ key: 'decimals', data: e.currentTarget.value })
            }
          />
        </Field>
      </Wrapper>
    </>
  )
}

export default memo(Details)
