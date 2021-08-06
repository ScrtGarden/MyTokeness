import commaNuber from 'comma-number'
import { FC, memo, useMemo } from 'react'
import { Coin } from 'secretjs/types/types'

import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import truncateAddress from '../../../../../utils/truncateAddress'
import { Text } from '../../../UI/Typography'
import { Amount, Container, StyledIcon, Wrapper } from './styles'

type Props = {
  from: string
  receiver: string
  coin: Coin
  decimals: number
  walletAddress: string
}

const TransferCell: FC<Props> = ({
  from,
  receiver,
  coin,
  decimals,
  walletAddress,
}) => {
  const isDeposit = useMemo(() => {
    if (from !== walletAddress && receiver !== walletAddress) {
      return null
    } else {
      return receiver === walletAddress
    }
  }, [from, receiver, walletAddress])

  const trueAmount = useMemo(
    () => commaNuber(toBiggestDenomination(coin.amount, decimals)),
    [coin, decimals]
  )

  return (
    <Container>
      <Wrapper>
        <StyledIcon name="wallet-duo" height={25} width={25} />
        <Text primary>
          {isDeposit === null &&
            `${truncateAddress(from, 7, 6)} -> ${truncateAddress(
              receiver,
              7,
              6
            )}`}
          {isDeposit === true && truncateAddress(from)}
          {isDeposit === false && truncateAddress(receiver)}
        </Text>
      </Wrapper>
      <Amount
        deposit={
          isDeposit === null ? 'null' : isDeposit === true ? 'true' : 'false'
        }
      >
        {isDeposit === true && '+'}
        {isDeposit === false && '-'}
        {` ${trueAmount} ${coin.denom}`}
      </Amount>
    </Container>
  )
}

export default memo(TransferCell)
