import { action, thunk } from 'easy-peasy'

import { Actions, Thunks } from './collections.model'

const actions: Actions & Thunks = {
  addedCollection: action((state, payload) => {
    const { contractAddress, walletAddress } = payload
    state.collections[walletAddress]
      ? state.collections[walletAddress].push({ address: contractAddress })
      : (state.collections[walletAddress] = [{ address: contractAddress }])
  }),
  removedCollection: action((state, payload) => {
    const { contractAddress, walletAddress } = payload
    const filtered = state.collectionsByAddress.filter(
      (item) => item.address !== contractAddress
    )
    state.collections[walletAddress] = filtered
  }),

  // thunks
  addCollection: thunk((actions, payload, { getStoreState }) => {
    actions.addedCollection({
      contractAddress: payload,
      walletAddress: getStoreState().auth.connectedAddress,
    })
  }),
  removeCollection: thunk((actions, payload, { getStoreState }) => {
    actions.removedCollection({
      contractAddress: payload,
      walletAddress: getStoreState().auth.connectedAddress,
    })
  }),
}

export default actions
