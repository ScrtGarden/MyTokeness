import styled from 'styled-components'

import { Row } from '../../../../UI/Table'

interface TextProps {
  readonly bold?: boolean
}

interface RowProps {
  readonly active?: boolean
}

const Wrapper = styled.div``

const Text = styled.p<TextProps>`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.md};
  ${(props) =>
    props.bold && `font-weight: ${props.theme.font.weights.semibold}`};
  margin: 0;
`

const StyledRow = styled(Row)<RowProps>`
  ${(props) => props.active && `border-bottom: none; background: #1f262d;`}
`

const Cell = styled.td`
  padding: ${(props) => props.theme.space.sm};
`

export { Text, Wrapper, Cell, StyledRow }
