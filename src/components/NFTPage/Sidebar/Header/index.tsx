import { FC, memo } from 'react'

import { UIPublicMetadata } from '../../../../../interface/nft-ui'
import { Container, Rarity, Title } from './styles'

export type Props = {
  name: string
  rarity: UIPublicMetadata['properties']['rarity']
}

const Header: FC<Props> = ({ name, rarity: { number, total } }) => (
  <Container>
    <Title>{name}</Title>
    <Rarity>{`${number} of ${total}`}</Rarity>
  </Container>
)

export default memo(Header)
