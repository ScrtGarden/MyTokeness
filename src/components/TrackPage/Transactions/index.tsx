import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'

import { useStoreState } from '../../../hooks/storeHooks'
import useDebounce from '../../../hooks/useDebounce'
import useQuerySnip20Config from '../../../hooks/useQuerySnip20Config'
import useQuerySnip20ViewingKey from '../../../hooks/useQuerySnip20ViewingKey'
import Snip20Selector from '../../Cards/Snip20Selector'
import { Container, InnerContainer } from '../../UI/Containers'
import { PageTitle } from '../../UI/Typography'
import { Content } from '../styles'
import History from './History'

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

  // lifecycle
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [debouncedAddy, viewingKey])

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
          <History
            contractAddress={debouncedAddy}
            walletAddress={walletAddress}
            viewingKey={viewingKey}
            success={isSuccess && !!viewingKey}
            loading={isLoading || gettingKey}
          />
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default Transactions
