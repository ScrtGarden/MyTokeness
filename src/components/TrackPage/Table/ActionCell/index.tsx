import commaNumber from 'comma-number'
import { FC, memo, useMemo } from 'react'

import { RichTx } from '../../../../../interface/snip20'
import toBiggestDenomination from '../../../../../utils/toBiggestDenomination'
import AddressWithCopy from '../../../Common/AddressWithCopyV2'
import { Container, Field, Label, Text, Title } from './styles'

type Props = {
  tx: RichTx
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
            <AddressWithCopy address={action.mint.minter} placement="right" />
          </Field>
          <Field>
            <Label>Recipient:</Label>
            <AddressWithCopy
              address={action.mint.recipient}
              placement="right"
            />
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
            <AddressWithCopy address={action.burn.owner} placement="right" />
          </Field>
          {action.burn.burner && (
            <Field>
              <Label>Burner:</Label>
              <AddressWithCopy address={action.burn.burner} placement="right" />
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
            <AddressWithCopy address={action.transfer.from} placement="right" />
          </Field>
          <Field>
            <Label>To:</Label>
            <AddressWithCopy
              address={action.transfer.recipient}
              placement="right"
            />
          </Field>
        </>
      )}
    </Container>
  )
}

export default memo(ActionCell)
