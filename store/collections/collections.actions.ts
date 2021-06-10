import { action, thunk } from 'easy-peasy'

import { Actions, Thunks } from './collections.model'

const actions: Actions & Thunks = {
  addedCollection: action((state, payload) => {
    const { contractAddress, walletAddress } = payload
    state.collections[walletAddress]
      ? state.collections[walletAddress].push({ address: contractAddress })
      : (state.collections[walletAddress] = [{ address: contractAddress }])
  }),
  addCollection: thunk((actions, payload, { getStoreState }) => {
    actions.addedCollection({
      contractAddress: payload,
      walletAddress: getStoreState().auth.connectedAddress,
    })
  }),
}

export default actions
