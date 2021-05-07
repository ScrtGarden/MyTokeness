import { memo } from 'react'

import { Field, Input, Label } from '../../../UI/Forms'
import { Header, Wrapper } from '../styles'

const InitialBalances = () => {
  return (
    <>
      <Header>Initial Balances</Header>
      <Wrapper>
        <Field>
          <Label>Address</Label>
          <Input />
        </Field>
        <Field>
          <Label>Amount</Label>
          <Input />
        </Field>
      </Wrapper>
    </>
  )
}

export default memo(InitialBalances)
