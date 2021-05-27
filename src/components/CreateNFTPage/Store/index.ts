import { action, computed, createContextStore } from 'easy-peasy'

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
    state.privateMetadata.content = payload
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
}

const computators: Computators = {}

const ContextStore = createContextStore({
  ...state,
  ...actions,
  ...computators,
})

export default ContextStore
