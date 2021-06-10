import { action } from 'easy-peasy'

import { Actions } from './collections.model'

const actions: Actions = {
  addCollection: action((state, payload) => {
    state.collections.push({ address: payload })
  }),
}

export default actions
