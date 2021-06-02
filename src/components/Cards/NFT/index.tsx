import { FC, memo } from 'react'

import useQueryNFTInfo from '../../../hooks/useQueryNFTInfo'
import Details from './Details'
import { Container } from './styles'
import Visual from './Visual'

type Props = {
  id: string
  contractAddress: string
}

const NFTCard: FC<Props> = ({ id, contractAddress }) => {
  const { data, isLoading, isError } = useQueryNFTInfo(contractAddress, id)

  if (isLoading) {
    return <Container>Loading...</Container>
  }

  if (isError || !data) {
    return <Container>Error</Container>
  }
  console.log({ data })
  return (
    <Container>
      <Visual image={data.image} />
      <Details title={data.name} properties={data.properties} />
    </Container>
  )
}

export default memo(NFTCard)
