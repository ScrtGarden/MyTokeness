import { Action, Computed } from 'easy-peasy'

export interface Attribute {
  key: string
  value: string
}

export interface PublicMetadata {
  name: string
  description?: string
  attributes: Attribute[]
  supply: string
}

export interface PrivateMetadata {
  content: string
}

export type SetAttributePayload = {
  index: number
  data: Attribute
}

export interface State {
  publicMetadata: PublicMetadata
  privateMetadata: PrivateMetadata
  publicFile?: File
  privateFile?: File
  hasSubmitted: boolean
}

export interface Actions {
  setPublicMetadata: Action<Model, Partial<PublicMetadata>>
  setPrivateMetadata: Action<Model, string>
  setPublicFile: Action<Model, File | undefined>
  setPrivateFile: Action<Model, File | undefined>
  setAttributes: Action<Model, SetAttributePayload>
}

export interface Computators {}

export interface Model extends State, Actions, Computators {}
