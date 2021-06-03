import { getUnixTime } from 'date-fns'

import {
  Expiration,
  HandleSetGlobalApproval,
} from '../../../../../interface/nft'
import { FormatExpiration } from '../../../Cards/ApprovalSetting/lib'

const validate = (isPrivate: boolean, settings: FormatExpiration) => {
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

const format = (
  isPrivate: boolean,
  settings: FormatExpiration,
  isOwnership?: boolean
): HandleSetGlobalApproval => {
  const view = isPrivate ? 'none' : 'all'

  let expires: Expiration = 'never'
  if (!isPrivate) {
    if (settings.type === 'date' && settings.date) {
      expires = { at_time: getUnixTime(settings.date) }
    } else if (settings.type === 'blockheight' && settings.blockheight) {
      expires = { at_height: parseInt(settings.blockheight, 10) }
    }
  }

  return {
    set_global_approval: {
      ...(isOwnership ? { view_owner: view } : { view_private_metadata: view }),
      ...(!isPrivate && { expires }),
    },
  }
}

export { validate, format }
