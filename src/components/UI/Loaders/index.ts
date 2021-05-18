import ReactSkeleton from 'react-loading-skeleton'
import styled from 'styled-components'

import Dots from './Dots'

const StyledDots = styled(Dots)`
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const Skeleton = styled(ReactSkeleton)`
  && {
    background-color: ${(props) => props.theme.loaders.skeleton.color};
    background-image: ${(props) => props.theme.loaders.skeleton.highlightColor};
  }
`

export { StyledDots, Skeleton }
