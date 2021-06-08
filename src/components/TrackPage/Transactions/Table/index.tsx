import { FC, memo, useMemo } from 'react'
import { Column, useFlexLayout, useTable } from 'react-table'

import { Tx } from '../../../../../interface/snip20'
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table as StyledTable,
} from '../../../UI/Table'

type Props = {
  data?: Tx[]
  columns: Column<Tx>[]
}

const Table: FC<Props> = ({ data = [], columns }) => {
  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useFlexLayout
    )

  return (
    <StyledTable {...getTableProps()}>
      <Head>
        {headerGroups.map((headerGroup) => (
          <HeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <HeaderCell {...column.getHeaderProps()}>
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
