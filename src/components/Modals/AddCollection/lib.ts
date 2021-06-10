import { Contract } from 'secretjs'

import { Collection } from '../../../../store/collections/collections.model'
import isSecretAddress from '../../../../utils/isSecretAddress'

const validate = (
  address: string,
  addedCollections: Collection[],
  myCollections: Contract[]
) => {
  const validation = {
    hasError: false,
    errors: {
      address: '',
    },
  }

  if (
    addedCollections.some((item) => item.address === address) ||
    myCollections.some((item) => item.address === address)
  ) {
    validation.hasError = true
    validation.errors.address = 'Collection already added.'
  } else if (!isSecretAddress(address)) {
    validation.hasError = true
    validation.errors.address = 'Please enter a valid address.'
  }

  return validation
}

export { validate }
