import Image from 'next/image'

import { Container, InnerContainer } from '../UI/Containers'
import { Text } from '../UI/Typography'
import { Brand, Images, Title } from './styles'

const Home = () => {
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
            src="/images/king.png"
            alt="king"
            height="300px"
            width="300px"
            objectFit="contain"
          />
          <Image
            src="/images/queen.png"
            alt="king"
            height="300px"
            width="300px"
            objectFit="contain"
          />
        </Images>
      </InnerContainer>
    </Container>
  )
}

export default Home
