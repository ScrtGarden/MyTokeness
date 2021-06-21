import { memo } from 'react'

import { Skeleton, Wrapper } from '../../UI/Loaders'
import { Container as Sidebar } from '../Sidebar/styles'
import { Container } from '../styles'

const SkeletonPage = () => (
  <Container>
    <Skeleton noflex height="600px" width="600px" />
    <Sidebar>
      <Wrapper>
        <Skeleton height="2.2rem" width="200px" noflex />
        <Skeleton height="1.4rem" width="40px" noflex />
      </Wrapper>
      <Wrapper>
        <Skeleton height="1.4rem" width="90%" noflex />
        <Skeleton height="1.4rem" width="85%" noflex />
        <Skeleton height="1.4rem" width="60%" noflex />
      </Wrapper>
    </Sidebar>
  </Container>
)

export default memo(SkeletonPage)
