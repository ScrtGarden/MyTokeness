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

export interface TokenConfig {
  public_total_supply: boolean
  deposit_enabled: boolean
  redeem_enabled: boolean
  mint_enabled: boolean
  burn_enabled: boolean
}

export interface TokenInfo {
  name: string
  symbol: string
  decimals: number
  total_supply?: string
}

type ResponseStatus = 'success' | 'failure'

type ContractStatusLevel = 'normal_run' | 'stop_all_but_redeems' | 'stop_all'

/**
 *  Queries
 */

export interface QueryTokenConfig {
  token_config: {}
}

export interface QueryTokenInfo {
  token_info: {}
}

export interface QueryMinters {
  minters: {}
}

/**
 *  Query Results
 */

export interface ResultTokenConfig {
  token_config: TokenConfig
}

export interface ResultTokenInfo {
  token_info: TokenInfo
}

export interface ResultMinters {
  minters: {
    minters: string[]
  }
}

/**
 *  Handle Msg
 */

export interface HandleMsgMint {
  mint: {
    recipient: string
    amount: string
    memo?: string
    padding?: string
  }
}

export interface HandleMsgBurn {
  burn: {
    amount: string
    memo?: string
    padding?: string
  }
}

export interface HandleMsgBurnFrom {
  burn_from: {
    owner: string
    amount: string
    memo?: string
    padding?: string
  }
}

export interface HandleMsgSetMinters {
  set_minters: {
    minters: string[]
    padding?: string
  }
}

export interface HandleMsgChangeAdmin {
  change_admin: {
    address: string
    padding?: string
  }
}

export interface HandleMsgSetContractStatus {
  set_contract_status: {
    level: ContractStatusLevel
    padding?: string
  }
}

/**
 *  Handle Msg Results
 */

export interface ResultMint {
  mint: {
    status: ResponseStatus
  }
}

export interface ResultBurn {
  burn: {
    status: ResponseStatus
  }
}

export interface ResultBurnFrom {
  burn_from: {
    status: ResponseStatus
  }
}

export interface ResultSetMinters {
  set_minters: {
    status: ResponseStatus
  }
}

export interface ResultChangeAdmin {
  change_admin: {
    status: ResponseStatus
  }
}

export interface ResultSetContractStatus {
  set_contract_status: {
    status: ResponseStatus
  }
}
