import styled, { keyframes } from 'styled-components'

import Dots from './Dots'

interface SkeletonProps {
  readonly height?: string
  readonly width?: string
  readonly circle?: boolean
  readonly noflex?: boolean
  readonly pill?: boolean
}

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

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }  
  100% {
    background-position: 1000px 0; 
  }
`

const Skeleton = styled.div.attrs<SkeletonProps>(({ height, width }) => ({
  style: {
    height: height || '14px',
    width: width || '100%',
  },
}))<SkeletonProps>`
  animation: 1.7s linear infinite forwards ${shimmer};
  background: ${(props) => props.theme.loaders.skeleton.color};
  background-image: ${(props) => props.theme.loaders.skeleton.highlightColor};
  background-repeat: no-repeat;
  background-size: 300px 100%;
  border-radius: ${(props) => (props.circle ? '50%' : '4px')};
  flex-shrink: 0;
  ${(props) => !props.circle && 'flex: 1'};
  ${(props) => props.noflex && 'flex: unset'};
  ${(props) => props.pill && 'border-radius: 500px'};
`

export { StyledDots, Skeleton }
