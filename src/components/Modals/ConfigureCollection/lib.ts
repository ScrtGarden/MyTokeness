const validate = (name: string, symbol: string) => {
  const errors = {
    hasErrors: false,
    name: '',
    symbol: '',
  }

  if (!name) {
    errors.name = 'Please enter a valid name.'
    errors.hasErrors = true
  }

  if (!symbol) {
    errors.symbol = 'Please enter a valid symbol.'
    errors.hasErrors = true
  }

  return errors
}

export { validate }
