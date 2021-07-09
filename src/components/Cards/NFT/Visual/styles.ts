import styled from 'styled-components'

import { Theme } from '../../../../styles/theme'
import Icon from '../../../Icons'

interface ContainerProps {
  readonly type?: string
}

const getColor = (theme: Theme, type?: string) => {
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
  align-items: center;
  aspect-ratio: 1.3;
  background-color: #000;
  cursor: pointer;
  display: flex;
  justify-content: center;
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

const DecryptText = styled.div`
  bottom: 50px;
  color: ${(props) => props.theme.palette.blue[700]};
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights};
  left: 0;
  position: absolute;
  right: 0;
  margin: auto;
  width: fit-content;
`

export { ImageWrapper, StyledIcon, Play, DecryptText }
