import styled from 'styled-components'

import { Input } from '../../UI/Forms'
import { RadioGroup } from '../../UI/Forms/Radio'

const StyledRadioGroup = styled(RadioGroup)`
  column-gap: ${(props) => props.theme.space.lg};
  flex-direction: row;
`

const InputWrapper = styled.div``

const StyledInput = styled(Input)`
  max-width: 350px;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.md};
`

export { StyledRadioGroup, InputWrapper, StyledInput, Field }
