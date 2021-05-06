import { Container, InnerContainer } from '../UI/Containers'
import { Text } from '../UI/Typography'
import { Brand } from './styles'

const Home = () => {
  return (
    <Container>
      <InnerContainer>
        <Brand>MyTokeness</Brand>
        <Text>
          A place to create, manage and explore tokens on the Secret Network.
        </Text>
      </InnerContainer>
    </Container>
  )
}

export default Home
