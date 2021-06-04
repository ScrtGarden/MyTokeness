import { fromUnixTime } from 'date-fns'

import { Expiration } from '../../../../interface/nft'
import { UIExpiration } from '../../../../interface/nft-ui'

const formatExpiration = (expiration: Expiration): UIExpiration => {
  const initial: UIExpiration = {
    type: 'never',
    date: new Date(),
    blockheight: '',
  }

  if (expiration === null || !expiration) {
    return initial
  } else if (expiration === 'never') {
    return { ...initial, type: 'never' }
  } else if ('at_time' in expiration) {
    return { ...initial, type: 'date', date: fromUnixTime(expiration.at_time) }
  } else {
    return {
      ...initial,
      type: 'blockheight',
      blockheight: String(expiration.at_height),
    }
  }
}

export { formatExpiration }
