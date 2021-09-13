import Big from 'big.js'

const toSmallestDenomination = (amount: string, decimals = 0): string => {
  if (!amount) {
    return '0'
  }
  const parsedAmount = Big(amount)
  const multipleAmount = Big(10).pow(decimals)

  return parsedAmount.times(multipleAmount).toFixed()
}

export default toSmallestDenomination
