import {
  ApprovalOptions,
  UIExpiration,
} from '../../../../../../../interface/nft-ui'

const validate = (options: ApprovalOptions, expiration: UIExpiration) => {
  const { type, date, blockheight } = expiration
  const validation = {
    hasError: false,
    errors: {
      expiration: '',
    },
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

export { validate }
