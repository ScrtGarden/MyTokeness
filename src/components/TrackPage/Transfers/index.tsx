import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'

import { useStoreState } from '../../../hooks/storeHooks'
import useDebounce from '../../../hooks/useDebounce'
import useQuerySnip20Config from '../../../hooks/useQuerySnip20Config'
import useQuerySnip20ViewingKey from '../../../hooks/useQuerySnip20ViewingKey'
import Snip20Selector from '../../Cards/Snip20Selector'
import { Container, InnerContainer } from '../../UI/Containers'
import { PageTitle } from '../../UI/Typography'
import Table from './Table'

const Transfers = () => {
  const queryClient = useQueryClient()

  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // component state
  const [contractAddress, setContractAddress] = useState(
    queryClient.getQueryData('selectedContractAddress') || ''
  )
  const debouncedAddy = useDebounce(contractAddress, 300)
  const [error, setError] = useState('')

  // custom hooks
  const { isLoading, isSuccess } = useQuerySnip20Config(debouncedAddy, {
    onSuccess: () => {
      queryClient.setQueryData('selectedContractAddress', debouncedAddy)
    },
    onError: () => {
      setError('Unable to fetch token information.')
    },
  })
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

  // lifecycle
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [debouncedAddy, viewingKey])

  console.log({ viewingKey })

  return (
    <Container>
      <InnerContainer>
        <PageTitle>Transfers</PageTitle>
        <Snip20Selector
          value={contractAddress}
          debouncedValue={debouncedAddy}
          onChange={(e) => setContractAddress(e.currentTarget.value)}
          loading={isLoading || gettingKey}
          error={error}
        />
        {/* <Table columns={columns} data={data} /> */}
      </InnerContainer>
    </Container>
  )
}

export default Transfers
