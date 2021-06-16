import { getUnixTime } from 'date-fns'

import {
  Expiration,
  HandleSetGlobalApproval,
  SetWhitelistedApproval,
} from '../../../../../interface/nft'
import { ApprovalOptions, UIExpiration } from '../../../../../interface/nft-ui'
import isSecretAddress from '../../../../../utils/isSecretAddress'

export interface ValidationError {
  option?: string
  value?: string
}

interface FormatConfig {
  isOwnership?: boolean
  tokenId?: string
}

interface FormatWhitelistAddConfig {
  tokenId?: string
}

const validate = (isPrivate: boolean, settings: UIExpiration) => {
  const { type, date, blockheight } = settings
  const validation = {
    hasError: false,
    errors: {
      option: '',
      value: '',
    },
  }

  if (!isPrivate && !type) {
    validation.hasError = true
    validation.errors.option = 'Please select an option.'
  } else if (type === 'date' && !date) {
    validation.hasError = true
    validation.errors.value = 'Please selected a valid date.'
  } else if (type === 'blockheight' && !blockheight) {
    validation.hasError = true
    validation.errors.value = 'Please enter a valid blockheight value.'
  }

  return validation
}

const formatExpiration = ({
  type,
  date,
  blockheight,
}: UIExpiration): Expiration => {
  if (type === 'date' && date) {
    return { at_time: getUnixTime(date) }
  } else if (type === 'blockheight' && blockheight) {
    return { at_height: parseInt(blockheight, 10) }
  }
  return 'never'
}

const format = (
  isPrivate: boolean,
  expiration: UIExpiration,
  config: FormatConfig = {}
): HandleSetGlobalApproval => {
  const { isOwnership, tokenId } = config
  const view = isPrivate
    ? !!tokenId
      ? 'revoke_token'
      : 'none'
    : !!tokenId
    ? 'approve_token'
    : 'all'

  let expires
  if (!isPrivate) {
    expires = formatExpiration(expiration)
  }

  return {
    set_global_approval: {
      ...(isOwnership ? { view_owner: view } : { view_private_metadata: view }),
      ...(!isPrivate && { expires }),
      ...(!!tokenId && { token_id: tokenId }),
    },
  }
}

const validateWhitelistAdd = (
  address: string,
  options: ApprovalOptions,
  { date, blockheight, type }: UIExpiration
) => {
  const validation = {
    hasError: false,
    errors: {
      address: '',
      option: '',
      value: '',
    },
  }

  if (!address || !isSecretAddress(address)) {
    validation.hasError = true
    validation.errors.address = 'Please enter a valid address.'
  }

  if (Object.values(options).some((value) => !value)) {
    if (!type) {
      validation.hasError = true
      validation.errors.option = 'Please select an option.'
    } else if (type === 'date' && !date) {
      validation.hasError = true
      validation.errors.value = 'Please selected a valid date.'
    } else if (type === 'blockheight' && !blockheight) {
      validation.hasError = true
      validation.errors.value = 'Please enter a valid blockheight value.'
    }
  }

  return validation
}

const formatWhitelistAdd = (
  address: string,
  { hideOwnership, hidePrivateMetadata, preventTransferPower }: ApprovalOptions,
  expiration: UIExpiration,
  config: FormatWhitelistAddConfig = {}
): SetWhitelistedApproval => {
  const { tokenId } = config
  const hiddenValue = !!tokenId ? 'revoke_token' : 'none'
  const publicValue = !!tokenId ? 'approve_token' : 'all'
  const viewOwner = hideOwnership ? hiddenValue : publicValue
  const viewPrivateMetadata = hidePrivateMetadata ? hiddenValue : publicValue
  const transfer = preventTransferPower ? hiddenValue : publicValue

  let expires
  if (!hideOwnership || !hidePrivateMetadata || !preventTransferPower) {
    expires = formatExpiration(expiration)
  }

  return {
    address,
    view_owner: viewOwner,
    view_private_metadata: viewPrivateMetadata,
    transfer,
    ...(!!expires && { expires }),
    ...(!!tokenId && { token_id: tokenId }),
  }
}

export { validate, format, validateWhitelistAdd, formatWhitelistAdd }
