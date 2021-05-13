import { Action, ActionOn, Computed } from 'easy-peasy'

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

export interface ValidationResult {
  hasErrors: boolean
  name: string
  symbol: string
  decimals: string
  adminAddress: string
  initialBalances: { address: string; amount: string }[]
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
  hasTriedSubmitting: boolean
}

export interface Actions {
  setState: Action<StoreModel, SetStatePayload>
  setSymbol: Action<StoreModel, string>
  setDecimals: Action<StoreModel, string>
  setBalance: Action<StoreModel, SetBalancePayload>
  resetState: Action<StoreModel>
}

export interface Computators {
  totalBalanceAmount: Computed<StoreModel, string>
  validation: Computed<StoreModel, ValidationResult>
}

export interface Listeners {
  onDecimalsChange: ActionOn<StoreModel>
}

export interface StoreModel extends State, Actions, Computators, Listeners {}
