import { PersistConfig, Store, createStore, persist } from 'easy-peasy'
import { useMemo } from 'react'

import { AuthModel, AuthState } from './auth/auth.model'
import authState from './auth/auth.state'
import authStore from './auth/auth.store'

export interface StoreModel {
  auth: AuthModel
}

export interface StoreState {
  auth: AuthState
}

let store: Store | undefined

const initialStoreState: StoreState = {
  auth: authState,
}

const storeModel: StoreModel = {
  auth: authStore,
}

const storeConfig: PersistConfig<StoreModel> = {
  storage: 'localStorage',
  deny: [],
}

const model = persist(storeModel, storeConfig)

// add this if you want to inject store
// const getStore = () => store

const initStore = (initialState = initialStoreState) =>
  createStore(model, {
    initialState,
    name: 'myTokeness',
    // injections: { getStore }, // add this if you want to inject store
  })

export const initializeStore = (preloadedState: StoreState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export const useStore = (initialState: StoreState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
