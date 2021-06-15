import { getUnixTime } from 'date-fns'

import {
  Expiration,
  HandleSetGlobalApproval,
  SetWhitelistedApproval,
} from '../../../../../interface/nft'
import { ApprovalOptions, UIExpiration } from '../../../../../interface/nft-ui'
import isSecretAddress from '../../../../../utils/isSecretAddress'

export interface ValidationError {
  option: string
  value: string
}

interface FormatOptions {
  isOwnership?: boolean
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
    validation.errors.value = 'Please enter a valid number.'
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
  config: FormatOptions = {}
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

const validateAdd = (
  address: string,
  options: ApprovalOptions,
  { date, blockheight, type }: UIExpiration
) => {
  const validation = {
    hasError: false,
    errors: {
      address: '',
      expiration: '',
    },
  }

  if (!address || !isSecretAddress(address)) {
    validation.hasError = true
    validation.errors.address = 'Please enter a valid address.'
  }

  if (Object.values(options).some((value) => !value)) {
    if (type === 'date' && !date) {
      validation.hasError = true
      validation.errors.expiration = 'Please select a valid date.'
    } else if (type === 'blockheight' && !blockheight) {
      validation.hasError = true
      validation.errors.expiration = 'Please enter a valid blockheight value.'
    }
  }

  return validation
}

const formatAdd = (
  address: string,
  { hideOwnership, hidePrivateMetadata, preventTransferPower }: ApprovalOptions,
  expiration: UIExpiration
): SetWhitelistedApproval => {
  const viewOwner = hideOwnership ? 'none' : 'all'
  const viewPrivateMetadata = hidePrivateMetadata ? 'none' : 'all'
  const transfer = preventTransferPower ? 'none' : 'all'

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
  }
}

export { validate, format, validateAdd, formatAdd }
