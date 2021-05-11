import Big from 'big.js'

import isSecretAddress from '../../../../utils/isSecretAddress'
import { Balance } from './model'

const totalBalanceAmount = (balances: Balance[]) => {
  const sum = balances.reduce((acc: string, balance): string => {
    const accBig = new Big(acc)

    return accBig.plus(balance.amount || '0').toString()
  }, '0')

  return sum
}

const validation = (
  name: string,
  symbol: string,
  decimals: string,
  adminAddress: string,
  initialBalances: Balance[],
  hasTriedSubmitting: boolean
) => {
  const errors = {
    hasErrors: false,
    name: '',
    symbol: '',
    decimals: '',
    adminAddress: '',
    initialBalances: [{ address: '', amount: '' }],
  }

  if (!name) {
    errors.hasErrors = true
    if (hasTriedSubmitting) {
      errors.name = 'Please enter a valid name.'
    }
  }

  if (!symbol) {
    errors.hasErrors = true
    if (hasTriedSubmitting) {
      errors.symbol = 'Please enter a valid symbol.'
    }
  } else if (symbol.length <= 2) {
    errors.hasErrors = true
    if (hasTriedSubmitting) {
      errors.symbol = 'Please enter a symbol at least 3 chars long.'
    }
  }

  if (!decimals) {
    errors.hasErrors = true
    if (hasTriedSubmitting) {
      errors.decimals = 'Please enter a valid decimal.'
    }
  }

  if (adminAddress && !isSecretAddress(adminAddress)) {
    errors.hasErrors = true
    if (hasTriedSubmitting) {
      errors.adminAddress = 'Please enter a valid address.'
    }
  }

  errors.initialBalances = initialBalances.map(({ address, amount }, index) => {
    const balanceError = {
      address: '',
      amount: '',
    }

    if (
      initialBalances.length > 1 &&
      index === initialBalances.length - 1 &&
      !address &&
      !amount
    ) {
      return balanceError
    }

    if (!isSecretAddress(address)) {
      errors.hasErrors = true
      if (hasTriedSubmitting) {
        balanceError.address = 'Please enter a valid address.'
      }
    }

    if (!amount) {
      errors.hasErrors = true
      if (hasTriedSubmitting) {
        balanceError.amount = 'Please enter a valid amount.'
      }
    }

    return balanceError
  })

  return errors
}

export { totalBalanceAmount, validation }
