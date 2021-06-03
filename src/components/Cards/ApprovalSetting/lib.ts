import { fromUnixTime } from 'date-fns'

import { Expiration } from '../../../../interface/nft'

export interface FormatExpiration {
  type?: 'never' | 'date' | 'blockheight'
  date?: Date
  blockheight?: string
}

const formatExpiration = (expiration: Expiration): FormatExpiration => {
  const initial = { type: undefined, date: new Date(), blockheight: '' }

  if (expiration === null || !expiration) {
    return initial
  } else if (expiration === 'never') {
    return { ...initial, type: 'never' }
  } else if ('at_time' in expiration) {
    return { ...initial, date: fromUnixTime(expiration.at_time) }
  } else {
    return { ...initial, blockheight: String(expiration.at_height) }
  }
}

export { formatExpiration }
