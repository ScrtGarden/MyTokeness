import { Action, Computed } from 'easy-peasy'

interface DraftCollectionConfig {
  id: string
  publicOwner: boolean
  enableSealedMetadata: boolean
  unwrappedMetadataIsPrivate: boolean
  minterMayUpdateMetadata: boolean
  ownerMayUpdateMetadata: boolean
  enableBurn: boolean
}

export interface State {
  draftCollectionConfigs: DraftCollectionConfig[]
}

export interface Actions {
  addCollectionConfig: Action<Model, DraftCollectionConfig>
}

export interface Computators {}

export interface Model extends State, Actions, Computators {}
