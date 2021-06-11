import styled from 'styled-components'

import { Skeleton } from '../../../UI/Loaders'
import { PageTitle } from '../../../UI/Typography'

const Container = styled.div`
  margin: 60px 0;
  width: 100%;
`

const Title = styled(PageTitle)`
  margin-bottom: 0;
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const AddressWrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => props.theme.space.sm};
`

const Subtext = styled.p`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.md};
  margin: 0;
`

const SkeletonTitle = styled(Skeleton)`
  flex: unset;
`

export { Container, Title, Wrapper, Subtext, AddressWrapper, SkeletonTitle }
