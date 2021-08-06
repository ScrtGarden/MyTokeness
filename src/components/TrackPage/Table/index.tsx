import { Fragment, memo, useState } from 'react'
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
import TransactionDetails from './Details/transaction'
import TransferDetails from './Details/transfer'
import { StyledRow } from './styles'

type Props<T extends Record<any, any>> = {
  data: T[]
  columns: Column<T>[]
  emptyListIcon: IconName
  emptyListText: string
  colSpan: number
  type?: 'transfer' | 'transaction'
}

const Table = <T extends Record<any, any>>({
  data = [],
  columns,
  emptyListIcon,
  emptyListText,
  colSpan,
  type = 'transfer',
}: Props<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    })

  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  console.log({ data })

  const onClickRow = (id: number) =>
    setSelectedItem(selectedItem === id ? null : id)

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
            const selected = selectedItem === row.original.id
            return (
              <Fragment key={row.getRowProps().key}>
                <StyledRow
                  {...row.getRowProps()}
                  onClick={() => onClickRow(row.original.id)}
                  noborder={selected}
                  foreground={selected}
                  pointer
                >
                  {row.cells.map((cell) => (
                    // eslint-disable-next-line react/jsx-key
                    <Cell {...cell.getCellProps()}>{cell.render('Cell')}</Cell>
                  ))}
                </StyledRow>
                {selected && (
                  <StyledRow
                    foreground
                    pointer
                    onClick={() => onClickRow(row.original.id)}
                  >
                    {type === 'transfer' ? (
                      <TransferDetails data={row.original as any} />
                    ) : (
                      <TransactionDetails data={row.original as any} />
                    )}
                  </StyledRow>
                )}
              </Fragment>
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
