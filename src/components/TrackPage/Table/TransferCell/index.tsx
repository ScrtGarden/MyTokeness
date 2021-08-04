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
  const isDeposit = useMemo(() => from !== walletAddress, [from, walletAddress])
  const trueAmount = useMemo(
    () => commaNuber(toBiggestDenomination(coin.amount, decimals)),
    [coin, decimals]
  )

  return (
    <Container>
      <Wrapper>
        <StyledIcon name="wallet-duo" height={25} width={25} />
        <Text primary>{truncateAddress(isDeposit ? from : receiver)}</Text>
      </Wrapper>
      <Amount deposit={isDeposit ? 'true' : 'false'}>
        {isDeposit ? '+' : '-'}
        {` ${trueAmount} ${coin.denom}`}
      </Amount>
    </Container>
  )
}

export default memo(TransferCell)
