import styled from 'styled-components'

import Icon from '../Icons'
import { Text } from '../UI/Typography'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: ${(props) => props.theme.space.md};
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.icon.colors.secondary};
  height: 4rem;
  width: 4rem;
`

const StyledText = styled(Text)`
  width: 60%;
  text-align: center;
`

export { Container, StyledIcon, StyledText }
