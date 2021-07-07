import styled from 'styled-components'

import Icon from '../../../Icons'

interface ContainerProps {
  readonly type?: string
}

const getColor = (theme: any, type?: string) => {
  if (type === 'video') {
    return '#000'
  } else if (type === 'audio') {
    return theme.bg
  } else {
    return 'transparent'
  }
}

const ImageWrapper = styled.div.attrs<ContainerProps>(({ type, theme }) => ({
  style: {
    backgroundColor: getColor(theme, type),
  },
}))<ContainerProps>`
  aspect-ratio: 1.3;
  background-color: #000;
  cursor: pointer;
  position: relative;
  width: 100%;

  .next-image {
  }

  .react-player {
  }
`

const Play = styled(Icon)`
  bottom: 0;
  fill: #e8e8e8;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
`

const StyledIcon = styled(Icon)`
  bottom: 0;
  fill: ${(props) => props.theme.palette.teal[400]};
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
`

export { ImageWrapper, StyledIcon, Play }
