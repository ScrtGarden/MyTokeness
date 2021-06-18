import { FC, memo } from 'react'

import { UIPublicMetadata } from '../../../../interface/nft-ui'
import Details from './Details'
import Header from './Header'
import { Container } from './styles'

type Props = {
  publicMetadata: UIPublicMetadata
}

const Sidebar: FC<Props> = ({
  publicMetadata: {
    name,
    properties: { rarity },
    description,
    attributes,
  },
}) => {
  return (
    <Container>
      <Header name={name} rarity={rarity} />
      <Details description={description} attributes={attributes} />
    </Container>
  )
}

export default memo(Sidebar)
