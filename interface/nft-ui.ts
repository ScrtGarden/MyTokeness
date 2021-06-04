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

export interface UIExpiration {
  type?: 'never' | 'date' | 'blockheight'
  date?: Date
  blockheight?: string
}
export type ExpirationReducer = (
  p: UIExpiration,
  u: UIExpiration
) => UIExpiration
