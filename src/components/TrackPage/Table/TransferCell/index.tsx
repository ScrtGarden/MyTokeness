import commaNumber from 'comma-number'
import { FC, memo, useMemo } from 'react'
import { Coin } from 'secretjs/types/types'

import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import { Text } from '../../../UI/Typography'
import { parseTransfer } from '../lib'
import { Amount, Container, NameWrapper, StyledIcon, Wrapper } from './styles'

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
  const { isDeposit, icon, name, description } = useMemo(
    () => parseTransfer(from, receiver, walletAddress),
    [from, receiver, walletAddress]
  )

  const trueAmount = useMemo(
    () => commaNumber(toBiggestDenomination(coin.amount, decimals)),
    [coin, decimals]
  )

  return (
    <Container>
      <Wrapper>
        <StyledIcon name={icon} height={25} width={25} />
        <NameWrapper>
          <Text primary>{name}</Text>
          <Text size="small">{description}</Text>
        </NameWrapper>
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
