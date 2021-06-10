import { computed } from 'easy-peasy'

import { Computators } from './collections.model'

const computators: Computators = {
  collectionsByAddress: computed(
    [
      (state) => state.collections,
      (_, storeState) => storeState.auth.connectedAddress,
    ],
    (collections, walletAddress) => collections[walletAddress] || []
  ),
}

export default computators
