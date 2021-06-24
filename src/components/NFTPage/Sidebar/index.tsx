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
  collectionName: string
}

const Sidebar: FC<Props> = ({
  publicMetadata: {
    name,
    properties: { rarity, categories },
    description,
    attributes,
  },
  privateContent,
  owner,
  collectionName,
}) => (
  <Container>
    <Header
      name={name}
      rarity={rarity}
      categories={categories}
      collectionName={collectionName}
    />
    {(!!description || attributes.length !== 0) && (
      <Details description={description} attributes={attributes} />
    )}
    {(!!owner || !!privateContent) && (
      <PermissionData owner={owner} content={privateContent} />
    )}
  </Container>
)

export default memo(Sidebar)
