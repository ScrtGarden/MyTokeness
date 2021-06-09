import { FC, memo } from 'react'
import { Column, useTable } from 'react-table'

import { RichTx } from '../../../../interface/snip20'
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table as StyledTable,
} from '../../UI/Table'

type Props = {
  data?: RichTx[]
  columns: Column<RichTx>[]
}

const Table: FC<Props> = ({ data = [], columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    })

  return (
    <StyledTable {...getTableProps()}>
      <Head>
        {headerGroups.map((headerGroup) => (
          <HeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <HeaderCell
                {...column.getHeaderProps({
                  style: { width: column.width },
                })}
              >
                {column.render('Header')}
              </HeaderCell>
            ))}
          </HeaderRow>
        ))}
      </Head>
      <Body {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <Row {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Cell {...cell.getCellProps()}>{cell.render('Cell')}</Cell>
                )
              })}
            </Row>
          )
        })}
      </Body>
    </StyledTable>
  )
}

export default memo(Table)
