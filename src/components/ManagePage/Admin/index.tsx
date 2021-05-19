import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'

import useDebounce from '../../../hooks/useDebounce'
import useQuerySnip20Config from '../../../hooks/useQuerySnip20Config'
import Snip20Selector from '../../Cards/Snip20Selector'
import { Container, Content, InnerContainer } from '../../UI/Containers'
import { PageTitle } from '../../UI/Typography'
import ChangeAdminCard from './ChangeAdminCard'
import ChangeStatusCard from './ChangeStatusCard'

const Admin = () => {
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

  const enableButton = useMemo(() => !!data, [data])

  // lifecycle
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [debouncedAddy])

  return (
    <Container>
      <InnerContainer>
        <PageTitle>Admin</PageTitle>
        <Content single>
          <Snip20Selector
            value={contractAddress}
            debouncedValue={debouncedAddy}
            onChange={(e) => setContractAddress(e.currentTarget.value)}
            loading={isLoading}
            error={error}
          />
          <ChangeAdminCard
            contractAddress={debouncedAddy}
            enableButton={enableButton}
          />
          <ChangeStatusCard contractAddress={debouncedAddy} />
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default Admin
