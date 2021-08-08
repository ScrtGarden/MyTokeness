import styled from 'styled-components'

import { Row } from '../../UI/Table'

interface RowProps {
  readonly noborder?: boolean
  readonly pointer?: boolean
  readonly foreground?: boolean
  readonly fixedheight?: boolean
  readonly hover?: boolean
}

const StyledRow = styled(Row)<RowProps>`
  ${(props) => props.foreground && `background: ${props.theme.fg}`};
  ${(props) => props.noborder && 'border-bottom: none'};
  ${(props) => props.pointer && 'cursor: pointer'};
  ${(props) => props.fixedheight && 'height: 70px'};
  transition: background 0.2s ease;

  :hover {
    ${(props) => props.hover && 'background: #1d252d'};
  }
`

export { StyledRow }
