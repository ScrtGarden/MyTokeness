import { ValidateResult } from '../../../../interface'

const validate = (
  option: Record<string, string> | null,
  amount: string
): ValidateResult => {
  let hasError = false
  const errors = { amount: '', token: '' }

  if (!option) {
    hasError = true
    errors.token = 'Please select a token.'
  }

  if (!amount || parseFloat(amount) === 0) {
    hasError = true
    errors.amount = 'Please enter a valid amount.'
  }

  return {
    hasError,
    errors,
  }
}

export { validate }
