import { TxAction } from '../../../../interface/snip20'
import { IconName } from '../../Icons'

interface ParseTransactionResult {
  type: string
  icon: IconName
  isDeposit: boolean
  address: string
  from?: string
  sender?: string
  recipient?: string
  owner?: string
  burner?: string
  minter?: string
}

const parseTransaction = (
  action: TxAction,
  walletAddress?: string
): ParseTransactionResult => {
  if (action.transfer) {
    const { from, recipient } = action.transfer
    const isDeposit = recipient === walletAddress
    return {
      type: 'transfer',
      icon: 'wallet-duo',
      isDeposit,
      address: isDeposit ? from : recipient,
      ...action.transfer,
    }
  } else if (action.mint) {
    return {
      type: 'mint',
      icon: 'hand-holding-usd',
      isDeposit: true,
      address: action.mint.recipient,
      ...action.mint,
    }
  } else if (action.burn) {
    return {
      type: 'burn',
      icon: 'fire-duo',
      isDeposit: false,
      address: action.burn.owner,
      ...action.burn,
    }
  } else if (action.deposit) {
    return {
      type: 'deposit',
      icon: 'dizzy',
      isDeposit: true,
      address: action.deposit.recipient,
      ...action.deposit,
    }
  } else if (action.redeem) {
    return {
      type: 'redeem',
      icon: 'dizzy',
      isDeposit: false,
      address: action.redeem.recipient || action.redeem.owner,
      ...action.redeem,
    }
  }
  return {
    type: '',
    icon: 'dizzy',
    isDeposit: false,
    address: '',
  }
}

export { parseTransaction }
