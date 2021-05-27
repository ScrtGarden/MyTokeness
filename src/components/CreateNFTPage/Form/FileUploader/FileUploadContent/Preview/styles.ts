import ReactPlayer from 'react-player'
import styled from 'styled-components'

const Container = styled.div`
  padding: ${(props) => props.theme.space.sm};
  position: relative;
  width: 100%;
`

const Image = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`

const StyledPlayer = styled.div`
  position: relative;
  height: 100%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`

export { Container, Image, StyledPlayer }
