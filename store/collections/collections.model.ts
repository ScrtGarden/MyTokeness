import { Action, Computed } from 'easy-peasy'

interface DraftCollectionConfig {
  id: string
  publicOwner: boolean
  enableSealedMetadata: boolean
  unwrappedMetadataIsPrivate: boolean
  minterMayUpdateMetadata: boolean
  ownerMayUpdateMetadata: boolean
  enableBurn: boolean
  name: string
  symbol: string
}

interface ConfigsByAddress {
  [walletAddress: string]: DraftCollectionConfig[]
}

interface AddConfigPayload extends DraftCollectionConfig {
  walletAddress: string
}

interface RemoveCollectionPayload {
  id: string
  walletAddress: string
}

export interface State {
  draftCollectionConfigs: ConfigsByAddress
}

export interface Actions {
  addCollection: Action<Model, AddConfigPayload>
  removeCollection: Action<Model, RemoveCollectionPayload>
}

export interface Computators {
  draftCollectionsByAddress: Computed<
    Model,
    (address: string) => DraftCollectionConfig[]
  >
  collectionById: Computed<
    Model,
    (walletAddress: string, id: string) => DraftCollectionConfig | undefined
  >
}

export interface Model extends State, Actions, Computators {}
