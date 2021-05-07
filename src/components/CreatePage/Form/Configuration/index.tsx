import { memo } from 'react'

import { Field, Hint, Label } from '../../../UI/Forms'
import Toggle from '../../../UI/Forms/Toggle'
import { Header, ToggleField, Wrapper } from '../styles'

const Configuration = () => {
  return (
    <>
      <Header margin>Configuration</Header>
      <Wrapper>
        <ToggleField>
          <Label>Enable public token supply</Label>
          <Toggle />
        </ToggleField>
        <Field>
          <ToggleField>
            <Label>Enable deposit</Label>
            <Toggle />
          </ToggleField>
          <Hint>
            If you enable this, you will be able to convert from SCRT to the
            token.
          </Hint>
        </Field>
        <Field>
          <ToggleField>
            <Label>Enable redeem</Label>
            <Toggle />
          </ToggleField>
          <Hint>
            If you enable this, you will be able to redeem your token for SCRT.
          </Hint>
        </Field>
        <ToggleField>
          <Label>Enable mint</Label>
          <Toggle />
        </ToggleField>
        <ToggleField>
          <Label>Enable burn</Label>
          <Toggle />
        </ToggleField>
      </Wrapper>
    </>
  )
}

export default memo(Configuration)
