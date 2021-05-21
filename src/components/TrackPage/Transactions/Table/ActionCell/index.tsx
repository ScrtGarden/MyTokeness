import { FC, memo } from 'react'

import { Tx } from '../../../../../../interface/snip20'
import { Container, Field, Label, Text, Title } from './styles'

type Props = {
  tx: Tx
}

const ActionCell: FC<Props> = ({ tx }) => {
  const {
    action,
    coins: { amount, denom },
  } = tx

  return (
    <Container>
      {action.mint && (
        <>
          <Title green>Mint</Title>
          <Field>
            <Label>Amount:</Label>
            <Text>{`${amount} ${denom}`}</Text>
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
            <Text>{`${amount} ${denom}`}</Text>
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
            <Text>{`${amount} ${denom}`}</Text>
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
