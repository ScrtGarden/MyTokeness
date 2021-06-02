import { FC, memo } from 'react'

import { UIPublicMetadata } from '../../../../../interface/nft-ui'
import { Container, Rarity, Title } from './styles'

type Props = {
  title: string
  properties: UIPublicMetadata['properties']
}

const Details: FC<Props> = ({ title, properties }) => {
  const { number, total } = properties.rarity

  return (
    <Container>
      <Title>{title}</Title>
      <Rarity>{`${number} of ${total}`}</Rarity>
    </Container>
  )
}

export default memo(Details)
