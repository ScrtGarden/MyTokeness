import { getUnixTime } from 'date-fns'

import {
  Expiration,
  HandleSetGlobalApproval,
  HandleSetWhitelistedApproval,
  SetWhitelistedApproval,
  Snip721Approval,
} from '../../../../../interface/nft'
import { UIExpiration } from '../../../../../interface/nft-ui'
import isSecretAddress from '../../../../../utils/isSecretAddress'
import { Options } from '../../../Cards/WhitelistSetting/AddNew'

const validate = (isPrivate: boolean, settings: UIExpiration) => {
  const { type, date, blockheight } = settings

  if (isPrivate) {
    return ''
  }

  if (type === 'date' && !date) {
    return 'Please selected a valid date.'
  }

  if (type === 'blockheight' && !blockheight) {
    return 'Please enter a valid number.'
  }

  return ''
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
  isOwnership?: boolean
): HandleSetGlobalApproval => {
  const view = isPrivate ? 'none' : 'all'

  let expires
  if (!isPrivate) {
    expires = formatExpiration(expiration)
  }

  return {
    set_global_approval: {
      ...(isOwnership ? { view_owner: view } : { view_private_metadata: view }),
      ...(!isPrivate && { expires }),
    },
  }
}

const validateAdd = (
  address: string,
  options: Options,
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
  { hideOwnership, hidePrivateMetadata, preventTransferPower }: Options,
  expiration: UIExpiration
): HandleSetWhitelistedApproval => {
  const viewOwner = hideOwnership ? 'none' : 'all'
  const viewPrivateMetadata = hidePrivateMetadata ? 'none' : 'all'
  const transfer = preventTransferPower ? 'none' : 'all'

  let expires
  if (!hideOwnership || !hidePrivateMetadata || !preventTransferPower) {
    expires = formatExpiration(expiration)
  }

  return {
    set_whitelisted_approval: {
      address,
      view_owner: viewOwner,
      view_private_metadata: viewPrivateMetadata,
      transfer,
      ...(!!expires && { expires }),
    },
  }
}

const updateTokenApprovals = (
  tokens: Snip721Approval[],
  toBeApproved: SetWhitelistedApproval
): Snip721Approval[] => {
  const formatted = formatToSnip721Approval(toBeApproved)
  const {
    address,
    view_owner_expiration,
    view_private_metadata_expiration,
    transfer_expiration,
  } = formatted

  const isWhitelisted = tokens.some((approved) => approved.address === address)

  if (!isWhitelisted) {
    return tokens.concat([formatted])
  }

  return tokens.reduce((acc: Snip721Approval[], approved) => {
    if (approved.address === address) {
      if (
        view_owner_expiration === null &&
        view_private_metadata_expiration === null &&
        transfer_expiration === null
      ) {
        return acc
      } else {
        return acc.concat([formatted])
      }
    }
    return acc.concat([approved])
  }, [])
}

const formatToSnip721Approval = ({
  address,
  view_owner,
  view_private_metadata,
  transfer,
  expires,
}: SetWhitelistedApproval): Snip721Approval => ({
  address,
  view_owner_expiration: view_owner === 'all' ? (expires as Expiration) : null,
  view_private_metadata_expiration:
    view_private_metadata === 'all' ? (expires as Expiration) : null,
  transfer_expiration: transfer === 'all' ? (expires as Expiration) : null,
})

export { validate, format, validateAdd, formatAdd, updateTokenApprovals }
