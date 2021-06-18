import { FC, memo } from 'react'
import ReactPlayer from 'react-player'

import { Container, Image, StyledPlayer } from './styles'

type Props = {
  src: string
  type: string
}

const Preview: FC<Props> = ({ src, type }) => (
  <Container>
    {type.includes('image/') ? (
      <Image src={src} alt="" />
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

export default memo(Preview)
