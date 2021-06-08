import { FC, memo } from 'react'
import { Column, useTable } from 'react-table'

import { Tx } from '../../../../../interface/nft'
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from '../../../UI/Table'

type Props = {
  columns: Column<Tx>[]
  data: Tx[]
}

const TransactionTable: FC<Props> = ({ data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    })

  return (
    <Table {...getTableProps()}>
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
    </Table>
  )
}

export default memo(TransactionTable)
