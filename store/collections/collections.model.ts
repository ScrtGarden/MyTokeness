import { Action, Computed, Thunk } from 'easy-peasy'

import { StoreModel } from '..'

export interface Collection {
  address: string
}

export interface Collections {
  [key: string]: Collection[]
}

export interface UpdateCollectionPayload {
  contractAddress: string
  walletAddress: string
}

export interface State {
  collections: Collections
}

export interface Actions {
  addedCollection: Action<Model, UpdateCollectionPayload>
  removedCollection: Action<Model, UpdateCollectionPayload>
}

export interface Thunks {
  addCollection: Thunk<Model, string, any, StoreModel>
  removeCollection: Thunk<Model, string, any, StoreModel>
}

export interface Computators {
  collectionsByAddress: Computed<Model, Collection[], StoreModel>
}

export interface Model extends State, Actions, Thunks, Computators {}
