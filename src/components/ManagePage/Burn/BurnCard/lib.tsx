import { HandleMsgBurn } from '../../../../../interface/snip20'
import addPadding from '../../../../../utils/addPadding'
import toSmallestDenomination from '../../../../../utils/toSmallestDenomination'

const validate = (amount: string) => {
  const errors = {
    hasErrors: false,
    amount: '',
  }

  if (!amount) {
    errors.hasErrors = true
    errors.amount = 'Please enter an amount greater than 0.'
  }

  return errors
}

const format = (memo: string, amount: string, decimals = 0): HandleMsgBurn => {
  const amountInSmallestDenom = toSmallestDenomination(amount, decimals)
  return {
    burn: {
      amount: amountInSmallestDenom,
      memo,
      padding: addPadding(amountInSmallestDenom),
    },
  }
}

export { validate, format }
