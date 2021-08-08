import commaNumber from 'comma-number'
import { FC, memo, useMemo } from 'react'

import { RichTx } from '../../../../../interface/snip20'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import { Text } from '../../../UI/Typography'
import { parseTransaction } from '../lib'
import {
  Amount,
  Container,
  NameWrapper,
  StyledIcon,
  Wrapper,
} from '../TransferCell/styles'

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
  const { isDeposit, icon, name, description } = useMemo(
    () => parseTransaction(action, walletAddress),
    [action, walletAddress]
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
        {` ${parsedAmount} ${denom}`}
      </Amount>
    </Container>
  )
}

export default memo(TransactionCell)
