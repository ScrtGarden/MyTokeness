import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Column } from 'react-table'

import {
  QueryTransactionHistory,
  ResultTransactionHistory,
  Tx,
} from '../../../../interface/snip20'
import { useStoreState } from '../../../hooks/storeHooks'
import useDebounce from '../../../hooks/useDebounce'
import useQueryContract from '../../../hooks/useQueryContract'
import useQuerySnip20Config from '../../../hooks/useQuerySnip20Config'
import useQuerySnip20ViewingKey from '../../../hooks/useQuerySnip20ViewingKey'
import Snip20Selector from '../../Cards/Snip20Selector'
import { Container, InnerContainer } from '../../UI/Containers'
import { CustomCell } from '../../UI/Table'
import { PageTitle } from '../../UI/Typography'
import { Content } from '../styles'
import Table from './Table'
import ActionCell from './Table/ActionCell'

const Transactions = () => {
  const queryClient = useQueryClient()

  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // component state
  const [contractAddress, setContractAddress] = useState(
    queryClient.getQueryData('selectedContractAddress') || ''
  )
  const debouncedAddy = useDebounce(contractAddress, 300)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)

  // custom hook - query snip20 config's
  const { isLoading, isSuccess } = useQuerySnip20Config(debouncedAddy, {
    onSuccess: () => {
      queryClient.setQueryData('selectedContractAddress', debouncedAddy)
    },
    onError: () => {
      setError('Unable to fetch token information.')
    },
  })

  // custom hook - only query viewing key if connected to keplr and snip20
  // config is valid
  const enabled = useMemo(
    () => !!(walletAddress && contractAddress && isSuccess),
    [walletAddress, contractAddress, isSuccess]
  )
  const { data: viewingKey, isLoading: gettingKey } = useQuerySnip20ViewingKey(
    { walletAddress, contractAddress: debouncedAddy },
    {
      enabled,
      onError: () => {
        setError("Can't find viewing key from Keplr Wallet.")
      },
    }
  )

  // custom hook - only query transaction history if viewing key is valid
  const { data } = useQueryContract<
    QueryTransactionHistory,
    ResultTransactionHistory,
    Tx[]
  >(
    ['transactionHistory', walletAddress, contractAddress, page],
    contractAddress,
    {
      transaction_history: {
        address: walletAddress,
        key: viewingKey as string,
        page: page,
        page_size: 10,
      },
    },
    {
      enabled: !!viewingKey,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      select: (data) => data.transaction_history.txs,
    }
  )

  // lifecycle
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [debouncedAddy, viewingKey])

  const columns: Column<Tx>[] = useMemo(
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
        Cell: ({ row: { original } }) => <ActionCell tx={original} />,
      },
      {
        Header: 'Memo',
        accessor: 'memo',
      },
    ],
    []
  )

  return (
    <Container>
      <InnerContainer>
        <PageTitle>Transactions</PageTitle>
        <Content>
          <Snip20Selector
            value={contractAddress}
            debouncedValue={debouncedAddy}
            onChange={(e) => setContractAddress(e.currentTarget.value)}
            loading={isLoading || gettingKey}
            error={error}
          />
          <Table columns={columns} data={data} />
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default Transactions
