import { action } from 'easy-peasy'

import { Actions } from './collections.model'

const actions: Actions = {
  addCollection: action((state, payload) => {
    const { walletAddress, ...rest } = payload

    if (state.draftCollectionConfigs[walletAddress]) {
      state.draftCollectionConfigs[walletAddress].push(rest)
    } else {
      state.draftCollectionConfigs = {
        ...state.draftCollectionConfigs,
        [walletAddress]: [rest],
      }
    }
  }),
  removeCollection: action((state, payload) => {
    const { walletAddress, id } = payload

    state.draftCollectionConfigs[walletAddress] = state.draftCollectionConfigs[
      walletAddress
    ].filter((config) => config.id !== id)
  }),
}

export default actions
