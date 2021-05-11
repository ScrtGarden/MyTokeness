import { action, computed, createContextStore } from 'easy-peasy'

import {
  amountPattern,
  decimalsPattern,
  symbolPattern,
} from '../../../../utils/regexPatterns'
import { Actions, Balance, Computators, State } from './model'

const state: State = {
  name: '',
  symbol: '',
  decimals: '',
  adminAddress: '',
  enablePublicTokenSupply: true,
  enableDeposit: false,
  enableRedeem: false,
  enableMint: false,
  enableBurn: false,
  initialBalances: [{ address: '', amount: '' }],
}

const actions: Actions = {
  setState: action((state: any, payload) => {
    const { data, key } = payload
    state[key] = data
  }),
  setSymbol: action((state, payload) => {
    if (!payload || payload.match(symbolPattern)) {
      state.symbol = payload
    }
  }),
  setDecimals: action((state, payload) => {
    if (!payload || payload.match(decimalsPattern)) {
      state.decimals = payload
    }
  }),
  setBalance: action((state, payload) => {
    const { index, data } = payload
    const balances = state.initialBalances

    if (data.amount) {
      const { amount } = data
      if (amount && !amount.match(amountPattern(state.decimals))) {
        return
      }
    }

    const newBalances: Balance[] = balances
      .map((balance, idx) =>
        index === idx ? { ...balance, ...data } : balance
      )
      .filter(({ address, amount }) => address || amount)
    const empty = newBalances.some(({ address, amount }) => !address || !amount)

    state.initialBalances = empty
      ? newBalances
      : newBalances.concat([{ address: '', amount: '' }])
  }),
}

const computators: Computators = {}

const Store = createContextStore({
  ...state,
  ...actions,
  ...computators,
})

export default Store
