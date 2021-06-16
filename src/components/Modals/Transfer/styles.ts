import styled from 'styled-components'

import { Content } from '../../UI/Modal'

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.md};
`

export { StyledContent }
