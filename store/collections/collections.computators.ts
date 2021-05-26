import { computed } from 'easy-peasy'

import { Computators } from './collections.model'

const computators: Computators = {
  draftCollectionsByAddress: computed(
    (state) => (contractAddress: string) =>
      state.draftCollectionConfigs[contractAddress] || []
  ),
}

export default computators
