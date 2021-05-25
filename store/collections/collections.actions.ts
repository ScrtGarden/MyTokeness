import { action } from 'easy-peasy'

import { Actions } from './collections.model'

const actions: Actions = {
  addCollectionConfig: action((state, payload) => {
    state.draftCollectionConfigs.push(payload)
  }),
}

export default actions
