import cryptoRandomString from 'crypto-random-string'

import { InitMsg } from '../../../../interface/nft'
import { Config } from '../../../../interface/nft-ui'

const validate = (name: string, symbol: string) => {
  const errors = {
    hasErrors: false,
    name: '',
    symbol: '',
  }

  if (!name) {
    errors.name = 'Please enter a valid name.'
    errors.hasErrors = true
  }

  if (!symbol) {
    errors.symbol = 'Please enter a valid symbol.'
    errors.hasErrors = true
  }

  return errors
}

const formatForInstantiateMsg = (
  name: string,
  symbol: string,
  config: Config
): InitMsg => {
  const {
    enableBurn,
    enableSealedMetadata,
    minterMayUpdateMetadata,
    ownerMayUpdateMetadata,
    publicOwner,
    publicTokenSupply,
    unwrappedMetadataIsPrivate,
  } = config

  return {
    name: name.trim(),
    symbol: symbol.toUpperCase(),
    entropy: cryptoRandomString({ length: 40, type: 'base64' }),
    config: {
      enable_burn: enableBurn,
      enable_sealed_metadata: enableSealedMetadata,
      minter_may_update_metadata: minterMayUpdateMetadata,
      owner_may_update_metadata: ownerMayUpdateMetadata,
      public_owner: publicOwner,
      public_token_supply: publicTokenSupply,
      unwrapped_metadata_is_private: unwrappedMetadataIsPrivate,
    },
  }
}

export { validate, formatForInstantiateMsg }
