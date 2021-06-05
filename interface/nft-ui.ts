export interface Config {
  publicTokenSupply: boolean
  publicOwner: boolean
  enableSealedMetadata: boolean
  unwrappedMetadataIsPrivate: boolean
  minterMayUpdateMetadata: boolean
  ownerMayUpdateMetadata: boolean
  enableBurn: boolean
  [key: string]: boolean
}

export interface UIPublicMetadata {
  name: string
  description?: string | null
  image: string
  properties: {
    rarity: {
      id?: string
      number: number
      total: number
    }
  }
  attributes: { [key: string]: string }[]
}

export type UIExpiration = {
  type?: 'never' | 'date' | 'blockheight'
  date?: Date
  blockheight?: string
}

export type ExpirationReducer = (
  p: UIExpiration,
  u: UIExpiration
) => UIExpiration

export interface UISnip721Approval {
  address: string
  viewOwnerExpiration: UIExpiration | null
  viewPrivateMetadataExpiration: UIExpiration | null
  transferExpiration: UIExpiration | null
}

export interface UIInventoryApprovals {
  ownerIsPublic: boolean
  publicOwnershipExpiration: UIExpiration
  privateMetadataIsPublic: boolean
  privateMetadataIsPublicExpiration: UIExpiration
  inventoryApprovals: UISnip721Approval[]
}
