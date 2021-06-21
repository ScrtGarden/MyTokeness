import { Container, InnerContainer } from '../UI/Containers'
import { Text } from '../UI/Typography'
import { Brand, Title } from './styles'

const Home = () => {
  return (
    <Container>
      <InnerContainer>
        <Title>Welcome,</Title>
        <Brand>MyTokeness</Brand>
        <Text>
          A place to create, manage and explore tokens on the Secret Network.
        </Text>
      </InnerContainer>
    </Container>
  )
}

export default Home
