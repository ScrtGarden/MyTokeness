import { Coin } from 'secretjs/types/types'

export interface Config {
  public_token_supply: boolean
  public_owner: boolean
  enable_sealed_metadata: boolean
  unwrapped_metadata_is_private: boolean
  minter_may_update_metadata: boolean
  owner_may_update_metadata: boolean
  enable_burn: boolean
}

interface PostInitCallback {
  msg: string
  contract_address: string
  code_hash: string
  send: Coin[]
}

export interface InitMsg {
  name: string
  symbol: string
  entropy: string
  admin?: string
  config?: Config
  post_init_callback?: PostInitCallback
}

/**
 *  Queries
 */

export interface QueryContractInfo {
  contract_info: {}
}

/**
 *  Results
 */

export interface ResultContractInfo {
  contract_info: {
    name: string
    symbol: string
  }
}
