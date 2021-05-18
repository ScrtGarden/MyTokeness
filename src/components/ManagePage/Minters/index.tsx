import { useState } from 'react'
import { useQueryClient } from 'react-query'

import useDebounce from '../../../hooks/useDebounce'
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

  return (
    <Container>
      <InnerContainer>
        <PageTitle>Minters</PageTitle>
        <Content single>
          <Snip20Selector
            value={contractAddress}
            debouncedValue={debouncedAddy}
            onChange={(e) => setContractAddress(e.currentTarget.value)}
            checkFor="mint"
          />
          <MintersCard contractAddress={debouncedAddy} />
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default Minters
