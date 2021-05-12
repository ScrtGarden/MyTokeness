export interface Balance {
  address: string
  amount: string
}

export interface Config {
  public_total_supply: boolean
  enable_deposit: boolean
  enable_redeem: boolean
  enable_mint: boolean
  enable_burn: boolean
}

export interface InitMsg {
  name: string
  symbol: string
  admin?: string
  decimals: number
  initial_balances: Balance[]
  prng_seed: string
  config: Config
}
