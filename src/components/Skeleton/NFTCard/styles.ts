import styled from 'styled-components'

import { Skeleton } from '../../UI/Loaders'

const SkeletonVisual = styled(Skeleton)`
  aspect-ratio: 1.3;
  border-radius: 0;
`

const Wrapper = styled.div`
  display: grid;
  flex-direction: column;
  padding: ${(props) => props.theme.space.sm};
  row-gap: ${(props) => props.theme.space.xs};
`

export { SkeletonVisual, Wrapper }
