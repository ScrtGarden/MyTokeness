import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'

import useDebounce from '../../../hooks/useDebounce'
import useQuerySnip20Config from '../../../hooks/useQuerySnip20Config'
import Snip20Selector from '../../Cards/Snip20Selector'
import { Container, Content, InnerContainer } from '../../UI/Containers'
import { PageTitle } from '../../UI/Typography'
import BurnCard from './BurnCard'

const Burn = () => {
  const queryClient = useQueryClient()

  // component state
  const [contractAddress, setContractAddress] = useState(
    queryClient.getQueryData('selectedContractAddress') || ''
  )
  const debouncedAddy = useDebounce(contractAddress, 300)
  const [error, setError] = useState('')

  // custom hooks
  const { data, isLoading, isSuccess } = useQuerySnip20Config(debouncedAddy, {
    onSuccess: (data) => {
      queryClient.setQueryData('selectedContractAddress', debouncedAddy)
      if (!data.token_config.burn_enabled) {
        setError('Burn functionality is disabled.')
      }
    },
    onError: () => {
      setError('Unable to fetch token information.')
    },
  })

  const enableButton = useMemo(
    () => data && data.token_config.burn_enabled,
    [data]
  )

  // lifecycle
  useEffect(() => {
    setError('')
  }, [debouncedAddy])

  return (
    <Container>
      <InnerContainer>
        <PageTitle>Burn Baby Burn</PageTitle>
        <Content single>
          <Snip20Selector
            value={contractAddress}
            debouncedValue={debouncedAddy}
            onChange={(e) => setContractAddress(e.currentTarget.value)}
            loading={isLoading}
            error={error}
          />
          <BurnCard
            contractAddress={debouncedAddy}
            enableButton={enableButton}
            success={isSuccess}
          />
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default Burn
