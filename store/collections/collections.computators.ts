import { computed } from 'easy-peasy'

import { Computators } from './collections.model'

const computators: Computators = {
  draftCollectionsByAddress: computed(
    (state) => (contractAddress: string) =>
      state.draftCollectionConfigs[contractAddress] || []
  ),
  collectionById: computed(
    (state) => (walletAddress: string, id: string) =>
      state
        .draftCollectionsByAddress(walletAddress)
        .find((collection) => collection.id === id)
  ),
}

export default computators
