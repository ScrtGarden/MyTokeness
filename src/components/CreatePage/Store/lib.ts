import Big from 'big.js'

import { Balance } from './model'

const totalBalanceAmount = (balances: Balance[]) => {
  const sum = balances.reduce((acc: string, balance): string => {
    const accBig = new Big(acc)

    return accBig.plus(balance.amount || '0').toString()
  }, '0')

  return sum
}

export { totalBalanceAmount }
