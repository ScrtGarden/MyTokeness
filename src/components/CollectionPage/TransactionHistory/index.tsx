import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useMemo, useState } from 'react'
import { Column } from 'react-table'

import {
  QueryTransactionHistory,
  ResultTransactionHistory,
  Tx,
} from '../../../../interface/nft'
import { DATE_FORMAT } from '../../../../utils/constants'
import getTotalPages from '../../../../utils/getTotalPages'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import { useStoreState } from '../../../hooks/storeHooks'
import useQueryContract from '../../../hooks/useQueryContract'
import SkeletonTable from '../../Common/SkeletonTable'
import EmptyList from '../../EmptyList'
import { CollectionRouterQuery } from '../../Layouts/CollectionLayout'
import { Anchor } from '../../UI/Buttons'
import Pagination from '../../UI/Pagination'
import { CustomCell } from '../../UI/Table'
import { Container } from './styles'
import Table from './Table'
import ActionCell from './Table/ActionCell'

const PAGE_SIZE = 10

const TransactionHistory = () => {
  const router = useRouter()
  const { contractAddress } = router.query as CollectionRouterQuery

  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)
  const viewingKey = useStoreState((state) =>
    state.auth.keyByContractAddress(contractAddress)
  )

  // component state
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useQueryContract<
    QueryTransactionHistory,
    ResultTransactionHistory
  >(
    ['transactionHistory', walletAddress, contractAddress, page - 1],
    contractAddress,
    {
      transaction_history: {
        address: walletAddress,
        viewing_key: viewingKey,
        page: page - 1,
        page_size: PAGE_SIZE,
      },
    },
    { keepPreviousData: true, enabled: !!viewingKey, retry: false }
  )
  const totalPages = useMemo(
    () => (data ? getTotalPages(data.transaction_history.total, PAGE_SIZE) : 1),
    [data]
  )

  const columns: Column<Tx>[] = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'tx_id',
        width: 40,
        Cell: ({ value }) => (
          <CustomCell bold center>
            {value}
          </CustomCell>
        ),
      },
      {
        Header: () => <CustomCell left>NFT Id</CustomCell>,
        accessor: 'token_id',
        Cell: ({
          row: {
            original: { token_id },
          },
        }) => (
          <Link
            href="/nft/[contract:token]"
            as={`/nft/${contractAddress}:${token_id}`}
            shallow={false}
            passHref
          >
            <Anchor>{token_id}</Anchor>
          </Link>
        ),
      },
      {
        Header: () => <CustomCell left>Action</CustomCell>,
        accessor: 'action',
        width: 200,
        Cell: ({ row: { original } }) => (
          <ActionCell tx={original} walletAddress={walletAddress} />
        ),
      },
      {
        Header: () => <CustomCell left>Memo</CustomCell>,
        accessor: 'memo',
        Cell: ({
          row: {
            original: { memo },
          },
        }) => memo || '--',
      },
      {
        Header: () => <CustomCell left>Date</CustomCell>,

        accessor: 'block_time',
        Cell: ({ value }) => (
          <CustomCell left>{format(value * 1000, DATE_FORMAT)}</CustomCell>
        ),
      },
    ],
    [walletAddress, contractAddress]
  )

  if (!viewingKey) {
    return (
      <Container>
        <EmptyList
          text="We need a viewing key to fetch you transactions. Please make sure you have created one and then come back."
          icon="key-skeleton"
          buttonText="Go Create Viewing Key"
          onClick={() =>
            router.push(
              '/nft/collections/[contractAddress]/settings/viewing-key',
              `/nft/collections/${contractAddress}/settings/viewing-key`,
              { shallow: true }
            )
          }
        />
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Container flexend>
        <SkeletonTable rows={4} />
      </Container>
    )
  }

  if (error) {
    const msg = parseErrorMsg(error)
    return (
      <Container>
        <EmptyList text={`Ooops! ${msg}.`} icon="sad-tear-duo" />
      </Container>
    )
  }

  if (!data) {
    return (
      <Container>
        <EmptyList
          text="Ooops! Looks like something went wrong."
          icon="sad-tear-duo"
        />
      </Container>
    )
  }

  return (
    <Container flexend>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />
      <Table data={data.transaction_history.txs} columns={columns} />
    </Container>
  )
}

export default memo(TransactionHistory)
