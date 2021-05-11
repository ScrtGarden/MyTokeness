import { computed } from 'easy-peasy'

import { AuthComputators } from './auth.model'

const computators: AuthComputators = {
  isWalletConnected: computed(
    [(state) => state.accounts],
    (accounts) => accounts.length > 0
  ),
  connectedAddress: computed([(state) => state.accounts], (accounts) =>
    accounts.length > 0 ? accounts[0].address : ''
  ),
  keyByContractAddress: computed((state) => (contractAddress: string) =>
    state.viewingKeys?.[state.connectedAddress]?.[contractAddress]
  ),
}

export default computators
