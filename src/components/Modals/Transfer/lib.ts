import { InfiniteData } from 'react-query'

import { ResultTokens } from '../../../../interface/nft'
import isSecretAddress from '../../../../utils/isSecretAddress'

const validate = (address: string, walletAddress: string) => {
  const validation = {
    hasError: false,
    errors: {
      address: '',
    },
  }

  if (!address || !isSecretAddress(address)) {
    validation.hasError = true
    validation.errors.address = 'Please enter a valid address.'
  } else if (address === walletAddress) {
    validation.hasError = true
    validation.errors.address = "You can't transfer the asset to yourself."
  }

  return validation
}

const tokensUpdater = (
  tokenId: string,
  prevData?: InfiniteData<ResultTokens>
): InfiniteData<ResultTokens> => {
  if (prevData) {
    const { pages, pageParams } = prevData

    let found = false
    const newPages = pages.reduce((acc: ResultTokens[], item) => {
      const { tokens } = item.token_list

      if (found || !tokens.some((token) => token === tokenId)) {
        return acc.concat([item])
      }

      found = true
      const filteredTokens = tokens.filter((x) => x !== tokenId)
      return acc.concat([{ token_list: { tokens: filteredTokens } }])
    }, [])

    return {
      pages: newPages,
      pageParams,
    }
  }

  return {
    pages: [],
    pageParams: [],
  }
}

export { validate, tokensUpdater }
