import { FC, memo } from 'react'

import { UINFTDossier, UIPublicMetadata } from '../../../../interface/nft-ui'
import Details from './Details'
import Header from './Header'
import PermissionData from './PermissionData'
import { Container } from './styles'

type Props = {
  publicMetadata: UIPublicMetadata
  privateContent?: string
  owner: UINFTDossier['owner']
}

const Sidebar: FC<Props> = ({
  publicMetadata: {
    name,
    properties: { rarity },
    description,
    attributes,
  },
  privateContent,
  owner,
}) => {
  return (
    <Container>
      <Header name={name} rarity={rarity} />
      {(!!description || attributes.length !== 0) && (
        <Details description={description} attributes={attributes} />
      )}
      {(!!owner || !!privateContent) && (
        <PermissionData owner={owner} content={privateContent} />
      )}
    </Container>
  )
}

export default memo(Sidebar)
