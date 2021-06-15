import { format } from 'date-fns'

import {
  ApprovalOptions,
  UIExpiration,
} from '../../../../../../interface/nft-ui'
import { DATE_FORMAT } from '../../../../../../utils/constants'

const getExpValue = ({ type, date, blockheight }: UIExpiration) => {
  if (type === 'never') {
    return 'Never'
  } else if (type === 'date') {
    return format(date as Date, DATE_FORMAT)
  } else {
    return blockheight
  }
}

const parseData = (
  viewOwner: boolean,
  viewPrivateMetadata: boolean,
  transfer: boolean,
  expiration: UIExpiration
) => {
  let permissions = ''

  if (viewOwner) {
    permissions = 'View ownership'
  }

  if (!!viewPrivateMetadata) {
    if (permissions) {
      permissions = `${permissions}, view private metadata`
    } else {
      permissions = 'View private metadata'
    }
  }

  if (!!transfer) {
    if (permissions) {
      permissions = `${permissions}, transfer`
    } else {
      permissions = 'Transfer'
    }
  }

  const expirationLabel = getExpValue(expiration)
  const options: ApprovalOptions = {
    hideOwnership: !viewOwner,
    hidePrivateMetadata: !viewPrivateMetadata,
    preventTransferPower: !transfer,
  }

  return {
    permissions,
    expirationLabel,
    options,
  }
}

const validate = (options: ApprovalOptions, expiration: UIExpiration) => {
  const { type, date, blockheight } = expiration
  const validation = {
    hasError: false,
    errors: {
      value: '',
    },
  }

  if (Object.values(options).some((value) => !value)) {
    if (type === 'date' && !date) {
      validation.hasError = true
      validation.errors.value = 'Please select a valid date.'
    } else if (type === 'blockheight' && !blockheight) {
      validation.hasError = true
      validation.errors.value = 'Please enter a valid blockheight value.'
    }
  }

  return validation
}

export { parseData, validate }
