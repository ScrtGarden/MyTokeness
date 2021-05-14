import { memo } from 'react'

import { Button } from '../../UI/Buttons'
import { Card, Header, Wrapper } from '../../UI/Card'
import { Field, Input, InputGroup, Label } from '../../UI/Forms'
import { Symbol } from './styles'

const Snip20Selector = () => {
  return (
    <Card>
      <Header>Token Selector</Header>
      <Wrapper>
        <Field>
          <Label>Contract address</Label>
          <InputGroup>
            <Input />
            <Symbol>
              {/* <StyledDots /> */}
              --
            </Symbol>
          </InputGroup>
        </Field>
      </Wrapper>
    </Card>
  )
}

export default memo(Snip20Selector)
