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

export interface Metadata {
  name: string
  description?: string
  image: string
  properties?: string
  attributes?: string
}

export interface MintNFT {
  token_id?: string
  owner?: string
  public_metadata?: Metadata
  private_metadata?: Partial<Metadata>
  memo?: string
  padding?: string
}

/**
 *  Queries
 */

export interface QueryContractInfo {
  contract_info: {}
}

/**
 *  HandleMsg
 */

export interface HandleMintNFT {
  mint_nft: MintNFT
}

export interface HandleBatchMintNFT {
  batch_mint_nft: {
    mints: MintNFT[]
  }
}

export interface HandleCreateViewingKey {
  create_viewing_key: {
    entropy: string
    padding?: string
  }
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
