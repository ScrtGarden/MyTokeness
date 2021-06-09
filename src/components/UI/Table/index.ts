import styled from 'styled-components'

interface CellProps {
  readonly width?: string
}

interface CustomCellProps {
  readonly bold?: boolean
  readonly center?: boolean
  readonly left?: boolean
  readonly right?: boolean
}

const Container = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0px;
  line-height: 20px;
  table-layout: fixed;
  width: 100%;
`

const Head = styled.thead``

const HeaderRow = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.border.color};
  display: table-row;
  width: 100%;
`

const HeaderCell = styled.th<CellProps>`
  box-sizing: border-box;
  color: ${(props) => props.theme.font.colors.primary};
  display: table-cell;
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  padding: ${(props) => props.theme.space.sm};
  ${({ width }) => width && `width: ${width}`};
  ${({ align }) => align && `text-align: ${align}`};
`

const Body = styled.tbody``

const Row = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.border.color}90;
  display: table-row;
  width: 100%;

  :only-child {
    border-bottom: none;
  }
`

const Cell = styled.td<CellProps>`
  box-sizing: border-box;
  align-items: center;
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  padding: ${(props) => props.theme.space.sm};
  ${({ width }) => width && `width: ${width}`};
  ${({ align }) => align && `text-align: ${align}`};
`

const CustomCell = styled.div<CustomCellProps>`
  width: 100%;

  ${(props) =>
    props.bold && `font-weight: ${props.theme.font.weights.semibold}`};
  ${(props) => props.center && 'text-align: center'};
  ${(props) => props.left && 'text-align: left'};
  ${(props) => props.right && 'text-align: right'};
`

export {
  Table,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  CustomCell,
  Container,
}
