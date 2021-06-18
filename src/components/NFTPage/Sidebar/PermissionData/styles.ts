import styled from 'styled-components'

import Icon from '../../../Icons'
import { Textarea } from '../../../UI/Forms'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.md};
`

const Owner = styled.div``

const Wrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  display: flex;
  margin-top: ${(props) => props.theme.space.sm};
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.icon.colors.secondary};
`

const StyledTextarea = styled(Textarea)`
  resize: none;
`

export { Container, Owner, Wrapper, StyledIcon, StyledTextarea }
