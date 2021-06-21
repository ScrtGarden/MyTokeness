import {
  Section,
  Container as Settings,
} from '../../../Cards/NFT/Settings/styles'
import { Container } from '../../../Cards/NFT/styles'
import { Skeleton } from '../../../UI/Loaders'
import { SkeletonVisual, Wrapper } from './styles'

const SkeletonNFTCard = () => (
  <Container>
    <SkeletonVisual height="none" />
    <Wrapper>
      <Skeleton height="16px" width="60%" />
      <Skeleton height="12px" width="20%" />
    </Wrapper>
    <Settings>
      <Section>
        <Skeleton circle height="16px" width="16px" />
        <Skeleton circle height="16px" width="16px" />
      </Section>
      <Skeleton circle height="16px" width="16px" />
    </Settings>
  </Container>
)

export default SkeletonNFTCard
