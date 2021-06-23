import { Action, Computed } from 'easy-peasy'

export interface Attribute {
  key: string
  value: string
}

export type Category =
  | 'Art'
  | 'Collectibles'
  | 'Domain Names'
  | 'Gift Cards'
  | 'Music'
  | 'Trading Cards'
  | 'Utility'
  | 'Virtual Worlds'

export interface CategoryItem {
  value: Category
  label: Category
}

export interface PublicMetadata {
  name: string
  description?: string
  attributes: Attribute[]
  supply: string
  categories: CategoryItem[]
}

export interface PrivateMetadata {
  content: string
}

export type SetAttributePayload = {
  index: number
  data: Attribute
}

export interface ValidationResult {
  errors: {
    name: string
    publicFile: string
    attributes: string[]
  }
  hasError: boolean
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
  setPrivateMetadata: Action<Model, Partial<PrivateMetadata>>
  setPublicFile: Action<Model, File | undefined>
  setPrivateFile: Action<Model, File | undefined>
  setAttributes: Action<Model, SetAttributePayload>
  setCategories: Action<Model, CategoryItem[]>
  setHasSubmitted: Action<Model, boolean>
  resetState: Action<Model>
}

export interface Computators {
  validation: Computed<Model, ValidationResult>
}

export interface Model extends State, Actions, Computators {}
