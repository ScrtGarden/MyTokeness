import { format } from 'date-fns'
import { FC, useMemo, useState } from 'react'
import { Column } from 'react-table'

import {
  QueryTransferHistory,
  ResultTransferHistory,
  Tx,
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
import TransferCell from '../Table/TransferCell'

type Props = {
  contractAddress: string
  walletAddress: string
  viewingKey?: string
  loading?: boolean
  decimals?: number
}

const PAGE_SIZE = 10

const Transfers: FC<Props> = ({
  contractAddress,
  walletAddress,
  viewingKey,
  loading,
  decimals = 0,
}) => {
  // component state
  const [page, setPage] = useState(1)

  const { data, error, isLoading } = useQueryContract<
    QueryTransferHistory,
    ResultTransferHistory
  >(
    ['transferHistory', walletAddress, contractAddress, page - 1],
    contractAddress,
    {
      transfer_history: {
        address: walletAddress,
        key: viewingKey as string,
        page: page - 1,
        page_size: PAGE_SIZE,
      },
    },
    {
      enabled: !!viewingKey,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  )

  useUpdateEffect(() => {
    setPage(1)
  }, [contractAddress])

  const totalPages = useMemo(
    () =>
      data && data.transfer_history.total
        ? getTotalPages(data.transfer_history.total, PAGE_SIZE)
        : -1,
    [data]
  )

  const columns: Column<Tx>[] = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
        width: 30,
        Cell: ({ value }) => (
          <CustomCell bold center>
            {value}
          </CustomCell>
        ),
      },
      {
        Header: () => <CustomCell left>Transfers</CustomCell>,
        accessor: 'sender',
        Cell: ({ row: { original: item } }) => (
          <TransferCell
            from={item.from}
            receiver={item.receiver}
            coin={item.coins}
            walletAddress={walletAddress}
            decimals={decimals}
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
    [walletAddress, decimals]
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
      <Table data={data.transfer_history.txs} columns={columns} />
    </Container>
  )
}

export default Transfers
