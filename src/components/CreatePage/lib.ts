import cryptoRandomString from 'crypto-random-string'

import { InitMsg } from '../../../interface/snip20'
import toSmallestDenomination from '../../../utils/toSmallestDenomination'
import { Balance, State } from './Store/model'

const formatter = (data: Omit<State, 'hasTriedSubmitting'>): InitMsg => {
  const {
    name,
    symbol,
    decimals,
    adminAddress,
    enablePublicTokenSupply,
    enableDeposit,
    enableRedeem,
    enableMint,
    enableBurn,
    initialBalances,
  } = data

  const intDecimals = parseInt(decimals, 10)
  const formattedBalances = formatBalances(initialBalances, intDecimals)

  return {
    name: name.trim(),
    symbol: symbol.toUpperCase(),
    decimals: intDecimals,
    ...(adminAddress ? { admin: adminAddress } : {}),
    prng_seed: cryptoRandomString({ length: 40, type: 'base64' }),
    initial_balances: formattedBalances,
    config: {
      public_total_supply: enablePublicTokenSupply,
      enable_deposit: enableDeposit,
      enable_redeem: enableRedeem,
      enable_burn: enableBurn,
      enable_mint: enableMint,
    },
  }
}

const formatBalances = (balances: Balance[], decimals: number): Balance[] =>
  balances.reduce(
    (acc: Balance[], { address, amount }) =>
      address && amount
        ? acc.concat([
            {
              address,
              amount: toSmallestDenomination(amount, decimals),
            },
          ])
        : acc,
    []
  )

export { formatter }
