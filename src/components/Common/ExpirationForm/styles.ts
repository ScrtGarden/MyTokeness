import styled from 'styled-components'

import { RadioGroup } from '../../UI/Forms/Radio'

const StyledRadioGroup = styled(RadioGroup)`
  column-gap: ${(props) => props.theme.space.lg};
  flex-direction: row;
`

const Wrapper = styled.div``

const Field = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.md};
`

export { StyledRadioGroup, Wrapper, Field }
