import { format } from 'date-fns'
import { FC, memo, useMemo, useState } from 'react'
import { Column } from 'react-table'

import {
  QueryTransactionHistory,
  ResultTransactionHistory,
  RichTx,
} from '../../../../interface/snip20'
import { DATE_FORMAT } from '../../../../utils/constants'
import getTotalPages from '../../../../utils/getTotalPages'
import useQueryContract from '../../../hooks/useQueryContract'
import useUpdateEffect from '../../../hooks/useUpdateEffect'
import SkeletonTable from '../../Common/SkeletonTable'
import Pagination from '../../UI/Pagination'
import { CustomCell } from '../../UI/Table'
import { Container, StyledEmptyList } from '../styles'
import Table from '../Table'
import TransactionCell from '../Table/TransactionCell'

type Props = {
  contractAddress: string
  walletAddress: string
  viewingKey?: string
  loading?: boolean
  decimals?: number
}

const PAGE_SIZE = 10

const History: FC<Props> = ({
  contractAddress,
  walletAddress,
  viewingKey,
  loading,
  decimals = 0,
}) => {
  // component state
  const [page, setPage] = useState(1)

  // custom hook - only query transaction history if viewing key is valid
  const { data, isLoading, error } = useQueryContract<
    QueryTransactionHistory,
    ResultTransactionHistory
  >(
    ['transactionHistory', walletAddress, contractAddress, page - 1],
    contractAddress,
    {
      transaction_history: {
        address: walletAddress,
        key: viewingKey as string,
        page: page - 1,
        page_size: PAGE_SIZE,
      },
    },
    {
      enabled: !!viewingKey,
      refetchOnWindowFocus: false,
      retry: false,
      keepPreviousData: true,
    }
  )

  useUpdateEffect(() => {
    setPage(1)
  }, [contractAddress])

  const totalPages = useMemo(
    () =>
      data && data.transaction_history.total
        ? getTotalPages(data.transaction_history.total, PAGE_SIZE)
        : -1,
    [data]
  )

  const columns: Column<RichTx>[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        width: 20,
        Cell: ({ value }) => (
          <CustomCell bold center>
            {value}
          </CustomCell>
        ),
      },
      {
        Header: () => <CustomCell left>Transaction</CustomCell>,
        accessor: 'action',
        Cell: ({ row: { original } }) => (
          <TransactionCell
            tx={original}
            decimals={decimals}
            walletAddress={walletAddress}
          />
        ),
      },
      {
        Header: () => <CustomCell left>Date</CustomCell>,
        accessor: 'block_time',
        width: 50,
        Cell: ({ value }) => (
          <CustomCell left>
            {value ? format(value * 1000, DATE_FORMAT) : '--'}
          </CustomCell>
        ),
      },
    ],
    [decimals, walletAddress]
  )

  if (isLoading || loading) {
    return (
      <Container>
        <SkeletonTable rows={5} />
      </Container>
    )
  }

  if (!data || !!error) {
    return (
      <StyledEmptyList
        icon="sad-tear-duo"
        text="Ooops! Looks like something went wrong. Please try again later."
      />
    )
  }

  return (
    <Container>
      {totalPages !== 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      )}
      <Table
        columns={columns}
        data={data.transaction_history.txs}
        emptyListIcon="list-ul-duo"
        emptyListText="Look like there's no transactions made here."
        colSpan={4}
        type="transaction"
      />
    </Container>
  )
}

export default memo(History)
