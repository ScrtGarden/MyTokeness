import { FC, memo, useMemo } from 'react'
import { Coin } from 'secretjs/types/types'

import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import AddressWithCopy from '../../../Common/AddressWithCopyV2'
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
    () => toBiggestDenomination(coin.amount, decimals),
    [coin, decimals]
  )

  return (
    <Container>
      <Wrapper>
        <StyledIcon name="wallet-duo" height={25} width={25} />
        <AddressWithCopy
          address={isDeposit ? from : receiver}
          placement="right"
        />
      </Wrapper>
      <Amount deposit={isDeposit ? 'true' : 'false'}>
        {isDeposit ? '+' : '-'}
        {`${trueAmount} ${coin.denom}`}
      </Amount>
    </Container>
  )
}

export default memo(TransferCell)
