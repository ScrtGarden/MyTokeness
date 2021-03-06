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
import { StyledEmptyList } from './styles'

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
          // eslint-disable-next-line react/jsx-key
          <HeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
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
        {rows.length === 0 ? (
          <Row>
            <Cell colSpan={4}>
              <StyledEmptyList
                icon="list-ul-duo"
                text="No transactions have be made on this account."
              />
            </Cell>
          </Row>
        ) : (
          rows.map((row) => {
            prepareRow(row)
            return (
              // eslint-disable-next-line react/jsx-key
              <Row {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  // eslint-disable-next-line react/jsx-key
                  <Cell {...cell.getCellProps()}>{cell.render('Cell')}</Cell>
                ))}
              </Row>
            )
          })
        )}
      </Body>
    </Table>
  )
}

export default memo(TransactionTable)
