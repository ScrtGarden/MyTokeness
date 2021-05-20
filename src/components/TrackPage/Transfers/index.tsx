import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import useDebounce from '../../../hooks/useDebounce'
import useQuerySnip20Config from '../../../hooks/useQuerySnip20Config'
import Snip20Selector from '../../Cards/Snip20Selector'
import { Container, InnerContainer } from '../../UI/Containers'
import { PageTitle } from '../../UI/Typography'

const Transfers = () => {
  const queryClient = useQueryClient()

  // component state
  const [contractAddress, setContractAddress] = useState(
    queryClient.getQueryData('selectedContractAddress') || ''
  )
  const debouncedAddy = useDebounce(contractAddress, 300)
  const [error, setError] = useState('')

  // custom hooks
  const { data, isLoading } = useQuerySnip20Config(debouncedAddy, {
    onSuccess: () => {
      queryClient.setQueryData('selectedContractAddress', debouncedAddy)
    },
    onError: (error) => {
      setError('Unable to fetch token information.')
    },
  })

  // lifecycle
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [debouncedAddy])

  return (
    <Container>
      <InnerContainer>
        <PageTitle>Transfers</PageTitle>
        <Snip20Selector
          value={contractAddress}
          debouncedValue={debouncedAddy}
          onChange={(e) => setContractAddress(e.currentTarget.value)}
          loading={isLoading}
          error={error}
        />
      </InnerContainer>
    </Container>
  )
}

export default Transfers
