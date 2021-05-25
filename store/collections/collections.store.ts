import actions from './collections.actions'
import computators from './collections.computators'
import listeners from './collections.listeners'
import { AuthModel } from './collections.model'
import state from './collections.state'

const store: AuthModel = {
  ...state,
  ...actions,
  ...computators,
  ...listeners,
}

export default store
