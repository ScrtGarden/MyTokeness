import { ActionTypes, StateMapper } from 'easy-peasy'

import { StoreModel } from './model'

const setInitialBalances = (state: any, payload: any) => {
  const { index, data } = payload
  console.log(payload)
}

export { setInitialBalances }
