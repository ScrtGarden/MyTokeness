import styled from 'styled-components'

import { Skeleton } from '../../UI/Loaders'

const Container = styled.div`
  aspect-ratio: 0.9;
  border: 2px solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radii.md};
  background: ${(props) => props.theme.fg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const SkeletonVisual = styled(Skeleton)`
  aspect-ratio: 1.3;
  border-radius: 0;
`

const Wrapper = styled.div`
  display: grid;
  flex-direction: column;
  padding: ${(props) => props.theme.space.md};
  row-gap: ${(props) => props.theme.space.xs};
`

export { Container, SkeletonVisual, Wrapper }
