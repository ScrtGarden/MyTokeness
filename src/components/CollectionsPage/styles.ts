import styled from 'styled-components'

import { Skeleton } from '../UI/Loaders'
import { PageTitle } from '../UI/Typography'

const Grid = styled.div`
  gap: ${(props) => props.theme.space.md};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.space.lg};
  width: 100%;
`

const StyledTitle = styled(PageTitle)`
  margin-bottom: 0;
`

const SkeletonCard = styled(Skeleton)`
  aspect-ratio: 1.4;
  border-radius: ${(props) => props.theme.border.radii.md};
  flex: unset;
`

export { Grid, SkeletonCard, StyledTitle, Header }
