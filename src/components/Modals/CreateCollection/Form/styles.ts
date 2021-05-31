import styled from 'styled-components'

import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import { Button } from '../../../UI/Buttons'

const StyledButton = styled(ButtonWithLoading)`
  margin-top: ${(props) => props.theme.space.lg};
`

export { StyledButton }
