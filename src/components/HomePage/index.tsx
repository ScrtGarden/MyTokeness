import Image from 'next/image'

import KING from '../../../public/images/king.png'
import QUEEN from '../../../public/images/queen.png'
import Icon from '../Icons'
import { Container, InnerContainer } from '../UI/Containers'
import { Text } from '../UI/Typography'
import { Brand, Images, Title, Wrapper } from './styles'

const Home = (): JSX.Element => {
  return (
    <Container>
      <InnerContainer>
        <Title>Welcome,</Title>
        <Brand>MyTokeness</Brand>
        <Text>
          A place to create, manage and explore tokens on the Secret Network.
        </Text>
        <Images>
          <Image
            src={KING}
            alt="king"
            height="300px"
            width="300px"
            objectFit="contain"
          />
          <Image
            src={QUEEN}
            alt="king"
            height="300px"
            width="300px"
            objectFit="contain"
          />
        </Images>
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
