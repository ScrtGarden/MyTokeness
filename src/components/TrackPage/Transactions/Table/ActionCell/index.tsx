import commaNumber from 'comma-number'
import { FC, memo, useMemo } from 'react'

import { Tx } from '../../../../../../interface/snip20'
import toBiggestDenomination from '../../../../../../utils/toBiggestDenomination'
import { Container, Field, Label, Text, Title } from './styles'

type Props = {
  tx: Tx
  decimals?: number
}

const ActionCell: FC<Props> = ({ tx, decimals }) => {
  const {
    action,
    coins: { amount, denom },
  } = tx

  const parsedAmount = useMemo(
    () => commaNumber(toBiggestDenomination(amount, decimals)),
    [decimals, amount]
  )

  return (
    <Container>
      {action.mint && (
        <>
          <Title green>Mint</Title>
          <Field>
            <Label>Amount:</Label>
            <Text>{`${parsedAmount} ${denom}`}</Text>
          </Field>
          <Field>
            <Label>Minter:</Label>
            <Text>{action.mint.minter}</Text>
          </Field>
          <Field>
            <Label>Recipient:</Label>
            <Text>{action.mint.recipient}</Text>
          </Field>
        </>
      )}

      {action.burn && (
        <>
          <Title red>Burn</Title>
          <Field>
            <Label>Amount:</Label>
            <Text>{`${parsedAmount} ${denom}`}</Text>
          </Field>
          <Field>
            <Label>From:</Label>
            <Text>{action.burn.owner}</Text>
          </Field>
          {action.burn.burner && (
            <Field>
              <Label>Burner:</Label>
              <Text>{action.burn.burner}</Text>
            </Field>
          )}
        </>
      )}

      {action.transfer && (
        <>
          <Title yellow>Transfer</Title>
          <Field>
            <Label>Amount:</Label>
            <Text>{`${parsedAmount} ${denom}`}</Text>
          </Field>
          <Field>
            <Label>From:</Label>
            <Text>{action.transfer.from}</Text>
          </Field>
          <Field>
            <Label>To:</Label>
            <Text>{action.transfer.recipient}</Text>
          </Field>
        </>
      )}
    </Container>
  )
}

export default memo(ActionCell)
