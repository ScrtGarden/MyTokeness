import { useRouter } from 'next/router'
import { memo, useMemo, useState } from 'react'
import { Column } from 'react-table'

import {
  QueryTransactionHistory,
  ResultTransactionHistory,
  Tx,
} from '../../../../interface/nft'
import { useStoreState } from '../../../hooks/storeHooks'
import useQueryContract from '../../../hooks/useQueryContract'
import SkeletonTable from '../../Common/SkeletonTable'
import EmptyList from '../../EmptyList'
import { CollectionRouterQuery } from '../../Layouts/CollectionLayout'
import Pagination from '../../UI/Pagination'
import { CustomCell } from '../../UI/Table'
import { Container } from './styles'
import Table from './Table'
import ActionCell from './Table/ActionCell'

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

  const { data, isError, isLoading } = useQueryContract<
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
        page_size: 10,
      },
    },
    { keepPreviousData: true, enabled: !!viewingKey }
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
        width: 70,
        accessor: 'token_id',
      },
      {
        Header: () => <CustomCell left>Action</CustomCell>,
        accessor: 'action',
        Cell: ({ row: { original } }) => (
          <ActionCell tx={original} walletAddress={walletAddress} />
        ),
      },
      {
        Header: () => <CustomCell left>Blockheight</CustomCell>,
        width: 50,
        accessor: 'blockheight',
        Cell: ({ value }) => <CustomCell left>{value}</CustomCell>,
      },
    ],
    [walletAddress]
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

  if (!data || isError) {
    return (
      <Container>
        <EmptyList
          text="Ooops! Looks like something went wrong."
          icon="exclamation-circle-duo"
        />
      </Container>
    )
  }

  return (
    <Container flexend>
      <Pagination currentPage={page} totalPages={5} onChange={setPage} />
      <Table data={data.transaction_history.txs} columns={columns} />
    </Container>
  )
}

export default memo(TransactionHistory)
