import { memo } from 'react'

import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import ExpirationForm from '../../../Common/ExpirationForm'
import { Buttons } from '../../../UI/Card'
import { Field, Input, Label, ToggleWrapper } from '../../../UI/Forms'
import Toggle from '../../../UI/Forms/Toggle'
import { Container, Content, Details, ExpirationWrapper } from './styles'

const AddNew = () => {
  return (
    <Container>
      <Content>
        <Details>
          <Field>
            <Label>Address</Label>
            <Input />
          </Field>
          <ToggleWrapper>
            <Toggle />
            <Label>Hide ownership</Label>
          </ToggleWrapper>
          <ToggleWrapper>
            <Toggle />
            <Label>Hide private metadata</Label>
          </ToggleWrapper>
          <ToggleWrapper>
            <Toggle />
            <Label>Prevent transfer power</Label>
          </ToggleWrapper>
        </Details>
        <ExpirationWrapper>
          <ExpirationForm settings={{}} />
        </ExpirationWrapper>
      </Content>
      <Buttons>
        <ButtonWithLoading text="Add" isPrimary width={51} />
      </Buttons>
    </Container>
  )
}

export default memo(AddNew)
