import { Attribute } from '../../../../interface/nft-ui'
import { ValidationResult } from './model'

const validate = (
  hasSubmitted: boolean,
  name: string,
  attributes: Attribute[],
  uploadedFile?: File
): ValidationResult => {
  const validation: ValidationResult = {
    hasError: false,
    errors: {
      name: '',
      publicFile: '',
      attributes: [],
    },
  }

  if (!name) {
    validation.hasError = true
    if (hasSubmitted) {
      validation.errors.name = 'Please add a name.'
    }
  }

  if (uploadedFile === undefined) {
    validation.hasError = true
    if (hasSubmitted) {
      validation.errors.publicFile = 'Please select a file to upload.'
    }
  }

  validation.errors.attributes = attributes.map(({ key, value }) => {
    const valid = (key && value) || (!key && !value)
    if (!valid && !validation.hasError) {
      validation.hasError = true
    }

    return hasSubmitted && !valid ? 'Please fill out both inputs.' : ''
  })

  return validation
}

export { validate }
