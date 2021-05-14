import Snip20Selector from '../../Cards/Snip20Selector'
import { Container, InnerContainer } from '../../UI/Containers'
import { PageTitle } from '../../UI/Typography'
import { Content } from '../styles'

const Mint = () => {
  return (
    <Container>
      <InnerContainer>
        <PageTitle>Mint</PageTitle>
        <Content>
          <Snip20Selector />
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default Mint
