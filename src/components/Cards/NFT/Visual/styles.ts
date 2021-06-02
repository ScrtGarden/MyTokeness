import styled from 'styled-components'

interface ContainerProps {
  readonly type?: string
}

const ImageWrapper = styled.div.attrs<ContainerProps>(({ type }) => ({
  style: {
    backgroundColor: type === 'video' ? '#000' : 'transparent',
  },
}))<ContainerProps>`
  background-color: #000;
  aspect-ratio: 1.3;
  position: relative;
  width: 100%;

  .next-image {
  }

  .react-player {
  }
`

export { ImageWrapper }
