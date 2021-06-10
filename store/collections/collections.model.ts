import { Action, Computed } from 'easy-peasy'

export interface Collection {
  address: string
}

export interface State {
  collections: Collection[]
}

export interface Actions {
  addCollection: Action<Model, string>
}

export interface Computators {}

export interface Model extends State, Actions, Computators {}
