import { FC, memo, useMemo, useState } from 'react'
import { Column } from 'react-table'

import {
  QueryTransactionHistory,
  ResultTransactionHistory,
  RichTx,
} from '../../../../../interface/snip20'
import getTotalPages from '../../../../../utils/getTotalPages'
import useQueryContract from '../../../../hooks/useQueryContract'
import useQuerySnip20Info from '../../../../hooks/useQuerySnip20Info'
import SkeletonTable from '../../../Common/SkeletonTable'
import Pagination from '../../../UI/Pagination'
import { Container, CustomCell } from '../../../UI/Table'
import Table from '../../Table'
import ActionCell from '../../Table/ActionCell'

type Props = {
  contractAddress: string
  success?: boolean
  walletAddress: string
  viewingKey?: string
  loading: boolean
}

const PAGE_SIZE = 10

const History: FC<Props> = (props) => {
  const { contractAddress, success, walletAddress, viewingKey, loading } = props
  console.log({ contractAddress, success })
  // component state
  const [page, setPage] = useState(1)

  // custom hook - query snip20 info if config is valid
  const { data: tokenInfo, isLoading: fetchingInfo } = useQuerySnip20Info(
    contractAddress,
    { enabled: success && !!contractAddress }
  )

  // custom hook - only query transaction history if viewing key is valid
  const { data, isLoading } = useQueryContract<
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
      enabled: success,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  )

  const totalPages = useMemo(
    () => (data ? getTotalPages(data.transaction_history.total, PAGE_SIZE) : 1),
    [data]
  )

  const columns: Column<RichTx>[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        width: 40,
        Cell: ({ value }) => (
          <CustomCell bold center>
            {value}
          </CustomCell>
        ),
      },
      {
        Header: () => <CustomCell left>Action</CustomCell>,
        accessor: 'action',
        Cell: ({ row: { original } }) => (
          <ActionCell tx={original} decimals={tokenInfo?.token_info.decimals} />
        ),
      },
      {
        Header: () => <CustomCell left>Memo</CustomCell>,
        accessor: 'memo',
      },
    ],
    [tokenInfo]
  )

  if (loading || fetchingInfo || isLoading) {
    return (
      <Container>
        <SkeletonTable rows={4} />
      </Container>
    )
  }

  if (!data || !contractAddress) {
    return null
  }

  return (
    <Container>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />
      <Table columns={columns} data={data?.transaction_history.txs || []} />
    </Container>
  )
}

export default memo(History)
