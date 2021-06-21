import styled from 'styled-components'

import ButtonWithLoading from '../../../Common/ButtonWithLoading'

const StyledButton = styled(ButtonWithLoading)`
  margin-top: ${(props) => props.theme.space.lg};
`

export { StyledButton }
