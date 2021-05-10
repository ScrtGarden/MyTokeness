import { Action, Computed } from 'easy-peasy'

export interface Balance {
  address: string
  amount: string
}

export interface SetStatePayload {
  key: string
  data: string | boolean | Balance[]
}

export interface SetBalancePayload {
  index: number
  data: Partial<Balance>
}

export interface State {
  name: string
  symbol: string
  decimals: string
  adminAddress: string
  enablePublicTokenSupply: boolean
  enableDeposit: boolean
  enableRedeem: boolean
  enableMint: boolean
  enableBurn: boolean
  initialBalances: Balance[]
}

export interface Actions {
  setState: Action<StoreModel, SetStatePayload>
  // setBalanceAddress: Action<StoreModel, SetBalancePayload>
  // setBalanceAmount: Action<StoreModel, SetBalancePayload>
  setBalance: Action<StoreModel, SetBalancePayload>
}

export interface Computators {}

export interface StoreModel extends State, Actions, Computators {}
