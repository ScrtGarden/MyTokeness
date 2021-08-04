import styled from 'styled-components'

import { Row } from '../../UI/Table'

interface RowProps {
  readonly noborder?: boolean
  readonly pointer?: boolean
  readonly foreground?: boolean
}

const StyledRow = styled(Row)<RowProps>`
  ${(props) => props.foreground && `background: ${props.theme.fg}`};
  ${(props) => props.noborder && 'border-bottom: none'};
  ${(props) => props.pointer && 'cursor: pointer'};
`

export { StyledRow }
