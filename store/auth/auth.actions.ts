import { action } from 'easy-peasy'

import { AuthActions } from './auth.models'

const actions: AuthActions = {
  setAccounts: action((state, payload) => {
    state.accounts = payload
  }),
  setViewingKey: action((state, payload) => {
    const { connectedAddress, viewingKeys } = state
    const { key, contractAddress } = payload

    if (!viewingKeys[connectedAddress]) {
      viewingKeys[connectedAddress] = { [contractAddress]: key }
    } else {
      viewingKeys[connectedAddress][contractAddress] = key
    }
  }),
  removeViewingKey: action((state, payload) => {
    state.viewingKeys[state.connectedAddress][payload] = ''
  }),
}

export default actions
