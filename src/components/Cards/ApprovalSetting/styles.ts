import styled from 'styled-components'

import ButtonWithLoading from '../../Common/ButtonWithLoading'
import { Input } from '../../UI/Forms'
import { RadioGroup } from '../../UI/Forms/Radio'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.theme.space.md} 0;
  row-gap: ${(props) => props.theme.space.md};
`

const ToggleWrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  flex-direction: row;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.md};
`

const StyledRadioGroup = styled(RadioGroup)`
  column-gap: ${(props) => props.theme.space.lg};
  flex-direction: row;
`

const StyledInput = styled(Input)`
  max-width: 350px;
`

const Wrapper = styled.div``

export {
  Content,
  ToggleWrapper,
  ButtonWrapper,
  StyledRadioGroup,
  StyledInput,
  Field,
  Wrapper,
}
