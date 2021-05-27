import styled from 'styled-components'

import { Button } from '../UI/Buttons'

const Container = styled.div`
  border: 1px solid red;
  margin-top: ${(props) => props.theme.space.lg};
  width: 100%;
`

const StyledButton = styled(Button)`
  align-self: flex-end;
  margin-bottom: ${(props) => props.theme.space.md};
`

export { Container, StyledButton }
