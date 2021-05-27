import { FC, memo } from 'react'

import { Container, Image } from './styles'

type Props = {
  src: string
}

const Preview: FC<Props> = (props) => {
  const { src } = props

  return (
    <Container>
      <Image src={src} />
    </Container>
  )
}

export default memo(Preview)
