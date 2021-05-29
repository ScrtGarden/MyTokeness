import cryptoRandomString from 'crypto-random-string'

import { InitMsg } from '../../../../interface/nft'
import { DraftCollectionConfig } from '../../../../store/collections/collections.model'
import { Attribute, MetadataUI, PrivateMetadataUI } from '../Store/model'

const formatAttrs = (attrs: Attribute[]) =>
  attrs.filter(({ key, value }) => key && value)

type Params = {
  publicMetadata: MetadataUI
  privateMetadata: PrivateMetadataUI
  file: File
  ipfsHash: string
}

const formatter = (params: Params) => {
  const { privateMetadata, publicMetadata, file, ipfsHash } = params
  const { name, description = '', attributes } = publicMetadata

  const formattedPublic = {
    name: name.trim(),
    description: description.trim(),
    attributes: JSON.stringify(formatAttrs(attributes)),
    image: `ipfs://${ipfsHash}/${file.name}`,
  }

  return {
    formattedPublic,
    formattedPrivate: privateMetadata,
  }
}

const formatForInstantiateMsg = (data: DraftCollectionConfig): InitMsg => {
  const {
    name,
    symbol,
    enableBurn,
    enableSealedMetadata,
    minterMayUpdateMetadata,
    ownerMayUpdateMetadata,
    publicOwner,
    publicTokenSupply,
    unwrappedMetadataIsPrivate,
  } = data

  return {
    name,
    symbol,
    entropy: cryptoRandomString({ length: 40, type: 'base64' }),
    config: {
      enable_burn: enableBurn,
      enable_sealed_metadata: enableSealedMetadata,
      minter_may_update_metadata: minterMayUpdateMetadata,
      owner_may_update_metadata: ownerMayUpdateMetadata,
      public_owner: publicOwner,
      public_token_supply: publicTokenSupply,
      unwrapped_metadata_is_private: unwrappedMetadataIsPrivate,
    },
  }
}

export { formatter, formatAttrs, formatForInstantiateMsg }
