import commaNumber from 'comma-number'
import { FC, memo, useMemo } from 'react'

import { RichTx } from '../../../../../interface/snip20'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import truncateAddress from '../../../../../utils/truncateAddress'
import { Text } from '../../../UI/Typography'
import { parseTransaction } from '../lib'
import { Amount, Container, StyledIcon, Wrapper } from '../TransferCell/styles'

type Props = {
  tx: RichTx
  decimals?: number
  walletAddress: string
}

const TransactionCell: FC<Props> = ({ tx, decimals, walletAddress }) => {
  const {
    action,
    coins: { amount, denom },
  } = tx

  const parsedAmount = useMemo(
    () => commaNumber(toBiggestDenomination(amount, decimals)),
    [decimals, amount]
  )
  const { isDeposit, icon, address } = useMemo(
    () => parseTransaction(action, walletAddress),
    [action, walletAddress]
  )

  return (
    <Container>
      <Wrapper>
        <StyledIcon name={icon} height={25} width={25} />
        <Text primary>{truncateAddress(address)}</Text>
      </Wrapper>
      <Amount deposit={isDeposit ? 'true' : 'false'}>
        {isDeposit ? '+' : '-'}
        {` ${parsedAmount} ${denom}`}
      </Amount>
    </Container>
  )
}

export default memo(TransactionCell)
