import Icon from '../Icons'
import { Container, InnerContainer } from '../UI/Containers'
import { Text } from '../UI/Typography'
import { Brand, StyledIcon, Title, Wrapper } from './styles'

const Home = (): JSX.Element => {
  return (
    <Container>
      <InnerContainer>
        <Title>Welcome to the</Title>
        <Brand>Secret Garden (Testnet)</Brand>
        <Text>
          A place to create, manage and explore tokens on the Secret Network.
        </Text>
        <StyledIcon name="treasure-hunt" width={350} height={350} />
        <Wrapper>
          <Text>
            <span>Powered by</span>
          </Text>
          <Icon name="secret-network-logo" width={100} height={40} />
        </Wrapper>
      </InnerContainer>
    </Container>
  )
}

export default Home
