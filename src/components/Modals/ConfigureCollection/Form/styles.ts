import styled from 'styled-components'

import { Button } from '../../../UI/Buttons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.md};
`

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.space.lg};
`

export { Container, StyledButton }
