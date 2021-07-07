import { FC, memo } from 'react'
import Lottie from 'react-lottie-player'

import lottieJson from '../../../../../public/lotties/heart.json'
import { Text } from '../../../UI/Typography'
import { Container, Title } from './styles'

const ThankYou: FC = () => {
  return (
    <Container>
      <Title>Thank You...</Title>
      <Lottie
        loop={false}
        animationData={lottieJson}
        play
        style={{ width: '50%', height: '50%' }}
      />
      <Text>
        ...for sharing the love. I hope you have a great day or night wherever
        you&apos;re from.
      </Text>
    </Container>
  )
}

export default memo(ThankYou)
