import { memo } from 'react'

import { Field, Input, Label } from '../../../UI/Forms'
import { Header, Wrapper } from '../styles'

const Details = () => {
  return (
    <>
      <Header>Details</Header>
      <Wrapper>
        <Field>
          <Label>Name</Label>
          <Input />
        </Field>
        <Field>
          <Label>Symbol</Label>
          <Input />
        </Field>
        <Field>
          <Label>Decimals</Label>
          <Input />
        </Field>
      </Wrapper>
    </>
  )
}

export default memo(Details)
