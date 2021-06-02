import { FC, memo } from 'react'

import useQueryNFTInfo from '../../../hooks/useQueryNFTInfo'
import { Skeleton } from '../../UI/Loaders'
import Details from './Details'
import { Container, SkeletonVisual, Wrapper } from './styles'
import Visual from './Visual'

type Props = {
  id: string
  contractAddress: string
}

const NFTCard: FC<Props> = ({ id, contractAddress }) => {
  const { data, isLoading, isError } = useQueryNFTInfo(contractAddress, id)

  if (isLoading) {
    return (
      <Container>
        <SkeletonVisual height="none" />
        <Wrapper>
          <Skeleton height="16px" width="60%" />
          <Skeleton height="12px" width="20%" />
        </Wrapper>
      </Container>
    )
  }

  if (isError || !data) {
    return <Container>Error</Container>
  }

  return (
    <Container>
      <Visual image={data.image} />
      <Details title={data.name} properties={data.properties} />
    </Container>
  )
}

export default memo(NFTCard)
