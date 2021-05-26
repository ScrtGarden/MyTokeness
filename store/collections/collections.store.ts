import actions from './collections.actions'
import computators from './collections.computators'
import listeners from './collections.listeners'
import { Model } from './collections.model'
import state from './collections.state'

const store: Model = {
  ...state,
  ...actions,
  ...computators,
  ...listeners,
}

export default store
