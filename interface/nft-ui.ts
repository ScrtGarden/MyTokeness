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
