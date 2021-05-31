import styled from 'styled-components'

import { Button } from '../../UI/Buttons'

const StyledButton = styled(Button)`
  align-self: flex-end;
  margin-bottom: ${(props) => props.theme.space.md};
`

export { StyledButton }
