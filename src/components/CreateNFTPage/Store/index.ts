import { action, computed, createContextStore } from 'easy-peasy'

import { validate } from './lib'
import { Actions, Computators, State } from './model'

const state: State = {
  publicMetadata: {
    name: '',
    description: '',
    attributes: [{ key: '', value: '' }],
    supply: '1',
  },
  privateMetadata: {
    content: '',
  },
  hasSubmitted: false,
}

const actions: Actions = {
  setPublicMetadata: action((state, payload) => {
    state.publicMetadata = { ...state.publicMetadata, ...payload }
  }),
  setPrivateMetadata: action((state, payload) => {
    state.privateMetadata = { ...state.privateMetadata, ...payload }
  }),
  setPublicFile: action((state, payload) => {
    state.publicFile = payload
  }),
  setPrivateFile: action((state, payload) => {
    state.privateFile = payload
  }),
  setAttributes: action((state, payload) => {
    const { index, data } = payload
    const attrs = state.publicMetadata.attributes

    const newAttrs = attrs
      .map((attr, idx) => (index === idx ? { ...attr, ...data } : attr))
      .filter(({ key, value }) => key || value)
    const empty = newAttrs.some(({ key, value }) => !key || !value)

    state.publicMetadata.attributes = empty
      ? newAttrs
      : newAttrs.concat([{ key: '', value: '' }])
  }),
  setHasSubmitted: action((state, payload) => {
    state.hasSubmitted = payload
  }),
  resetState: action((_state) => {
    _state.publicMetadata = state.publicMetadata
    _state.privateMetadata = state.privateMetadata
    _state.publicFile = undefined
    _state.privateFile = undefined
    _state.hasSubmitted = false
  }),
}

const computators: Computators = {
  validation: computed(
    [
      (state) => state.hasSubmitted,
      (state) => state.publicMetadata.name,
      (state) => state.publicMetadata.attributes,
      (state) => state.publicFile,
    ],
    validate
  ),
}

const ContextStore = createContextStore({
  ...state,
  ...actions,
  ...computators,
})

export default ContextStore
