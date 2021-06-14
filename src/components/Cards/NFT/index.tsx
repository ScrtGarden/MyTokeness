import { FC, memo } from 'react'

import useQueryNFTDossier from '../../../hooks/useQueryNFTDossier'
import useQueryNFTInfo from '../../../hooks/useQueryNFTInfo'
import { Skeleton } from '../../UI/Loaders'
import Details from './Details'
import Settings from './Settings'
import { Container, SkeletonVisual, Wrapper } from './styles'
import Visual from './Visual'

type Props = {
  id: string
  contractAddress: string
  walletAddress: string
  viewingKey: string
}

const NFTCard: FC<Props> = ({
  id,
  contractAddress,
  walletAddress,
  viewingKey,
}) => {
  // const { data, isLoading, isError } = useQueryNFTInfo(contractAddress, id)
  const { data, isLoading, isError } = useQueryNFTDossier(
    contractAddress,
    id,
    walletAddress,
    viewingKey
  )

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

  console.log({ data })
  return (
    <Container>
      <Visual image={data.publicMetadata.image} />
      <Details
        title={data.publicMetadata.name}
        properties={data.publicMetadata.properties}
      />
      <Settings />
    </Container>
  )
}

export default memo(NFTCard)
