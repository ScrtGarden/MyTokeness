import { TxAction } from '../../../../interface/snip20'
import { DAPPS } from '../../../../utils/dapps'
import truncateAddress from '../../../../utils/truncateAddress'
import { IconName } from '../../Icons'

interface ParseTransactionResult {
  type: string
  icon: IconName
  isDeposit: boolean | null
  name: string
  description?: string
  from?: string
  sender?: string
  recipient?: string
  owner?: string
  burner?: string
  minter?: string
}

interface ParseTransferResult {
  icon: IconName
  isDeposit: boolean | null
  name: string
  description?: string
}

const parseTransaction = (
  action: TxAction,
  walletAddress?: string
): ParseTransactionResult => {
  if (action.transfer) {
    const { from, recipient } = action.transfer
    const parsedData = parseTransfer(from, recipient, walletAddress)

    return {
      type: 'transfer',
      ...parsedData,
      ...action.transfer,
    }
  } else if (action.mint) {
    return {
      type: 'mint',
      icon: 'hand-holding-usd',
      isDeposit: true,
      name: truncateAddress(action.mint.recipient),
      ...action.mint,
    }
  } else if (action.burn) {
    return {
      type: 'burn',
      icon: 'fire-duo',
      isDeposit: false,
      name: truncateAddress(action.burn.owner),
      ...action.burn,
    }
  } else if (action.deposit) {
    return {
      type: 'deposit',
      icon: 'piggy-bank-duo',
      isDeposit: true,
      name: truncateAddress(action.deposit.recipient),
      ...action.deposit,
    }
  } else if (action.redeem) {
    return {
      type: 'redeem',
      icon: 'ticket-duo',
      isDeposit: false,
      name: truncateAddress(action.redeem.recipient || action.redeem.owner),
      ...action.redeem,
    }
  }
  return {
    type: '',
    icon: 'dizzy',
    isDeposit: false,
    name: '',
  }
}

const parseTransfer = (
  from: string,
  receiver: string,
  walletAddress?: string
): ParseTransferResult => {
  const isOnlySender = from !== walletAddress && receiver !== walletAddress
  const isDeposit = isOnlySender ? null : receiver === walletAddress

  let icon: IconName = 'wallet-duo'
  let name = ''
  let description = ''

  if (isDeposit === null) {
    icon = 'exchange-duo'
    name = `${truncateAddress(from, 7, 4)} → ${truncateAddress(receiver, 7, 4)}`
  } else {
    const dapp = DAPPS[isDeposit ? from : receiver]
    if (dapp) {
      icon = dapp.icon
      name = dapp.name
      description = dapp.description
    } else {
      name = truncateAddress(isDeposit ? from : receiver)
    }
  }

  return {
    isDeposit,
    icon,
    name,
    description,
  }
}

export { parseTransaction, parseTransfer }
