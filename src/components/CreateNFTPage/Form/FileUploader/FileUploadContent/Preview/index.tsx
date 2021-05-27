import { FC, memo } from 'react'
import ReactPlayer from 'react-player'

import { Container, Image, StyledPlayer } from './styles'

type Props = {
  src: string
  type: string
}

const Preview: FC<Props> = (props) => {
  const { src, type } = props
  console.log({ src, type })

  return (
    <Container>
      {type.includes('image/') ? (
        <Image src={src} />
      ) : (
        <StyledPlayer>
          <ReactPlayer
            className="react-player"
            url={src}
            width="100%"
            height="100%"
            controls
          />
        </StyledPlayer>
      )}
    </Container>
  )
}

export default memo(Preview)
