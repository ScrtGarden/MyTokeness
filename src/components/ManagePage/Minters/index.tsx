import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'

import useDebounce from '../../../hooks/useDebounce'
import useQuerySnip20Config from '../../../hooks/useQuerySnip20Config'
import Snip20Selector from '../../Cards/Snip20Selector'
import { Container, Content, InnerContainer } from '../../UI/Containers'
import { PageTitle } from '../../UI/Typography'
import MintersCard from './MintersCard'

const Minters = () => {
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
      if (!data.token_config.mint_enabled) {
        setError('Mint functionality is disabled.')
      }
    },
    onError: () => {
      setError('Unable to fetch token information.')
    },
  })

  const enableButton = useMemo(
    () => data && data.token_config.mint_enabled,
    [data]
  )

  // lifecycle
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [debouncedAddy])

  return (
    <Container>
      <InnerContainer>
        <PageTitle>Minters</PageTitle>
        <Content single>
          <Snip20Selector
            value={contractAddress}
            debouncedValue={debouncedAddy}
            onChange={(e) => setContractAddress(e.currentTarget.value)}
            loading={isLoading}
            error={error}
          />
          <MintersCard
            contractAddress={debouncedAddy}
            enableButton={enableButton}
            success={isSuccess}
          />
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default Minters
