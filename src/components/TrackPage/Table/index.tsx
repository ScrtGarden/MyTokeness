import { memo } from 'react'
import { Column, useTable } from 'react-table'

import EmptyList from '../../EmptyList'
import { IconName } from '../../Icons'
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table as StyledTable,
} from '../../UI/Table'

type Props<T extends Record<any, any>> = {
  data: T[]
  columns: Column<T>[]
  emptyListIcon: IconName
  emptyListText: string
  colSpan: number
}

const Table = <T extends Record<any, any>>({
  data = [],
  columns,
  emptyListIcon,
  emptyListText,
  colSpan,
}: Props<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    })

  return (
    <StyledTable {...getTableProps()}>
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
        {rows.length !== 0 ? (
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
        ) : (
          <Row>
            <Cell colSpan={colSpan}>
              <EmptyList icon={emptyListIcon} text={emptyListText} />
            </Cell>
          </Row>
        )}
      </Body>
    </StyledTable>
  )
}

export default memo(Table)
