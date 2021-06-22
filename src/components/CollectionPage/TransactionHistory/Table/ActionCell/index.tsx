import { FC, memo } from 'react'

import { Tx } from '../../../../../../interface/nft'
import AddressWithCopy from '../../../../Common/AddressWithCopy'
import { Container, Field, Label, Text, Title } from './styles'

type Props = {
  tx: Tx
  walletAddress: string
}

const ActionCell: FC<Props> = ({ tx, walletAddress }) => {
  const { action } = tx

  return (
    <Container>
      {'mint' in action && (
        <>
          <Title green>Mint</Title>
          <Field>
            <Label>Minter:</Label>
            {walletAddress === action.mint.minter ? (
              <Text>You</Text>
            ) : (
              <AddressWithCopy address={action.mint.minter} />
            )}
          </Field>
          <Field>
            <Label>Recipient:</Label>
            {walletAddress === action.mint.recipient ? (
              <Text>You</Text>
            ) : (
              <AddressWithCopy address={action.mint.recipient} />
            )}
          </Field>
        </>
      )}

      {'burn' in action && (
        <>
          <Title red>Burn</Title>
          <Field>
            <Label>Owner:</Label>
            {walletAddress === action.burn.owner ? (
              <Text>You</Text>
            ) : (
              <AddressWithCopy address={action.burn.owner} />
            )}
          </Field>
          {action.burn.burner && (
            <Field>
              <Label>Burner:</Label>
              {walletAddress === action.burn.burner ? (
                <Text>You</Text>
              ) : (
                <AddressWithCopy address={action.burn.burner} />
              )}
            </Field>
          )}
        </>
      )}

      {'transfer' in action && (
        <>
          <Title yellow>Transfer</Title>
          <Field>
            <Label>From:</Label>
            {walletAddress === action.transfer.from ? (
              <Text>You</Text>
            ) : (
              <AddressWithCopy address={action.transfer.from} />
            )}
          </Field>
          {action.transfer.sender && (
            <Field>
              <Label>To:</Label>
              {walletAddress === action.transfer.sender ? (
                <Text>You</Text>
              ) : (
                <AddressWithCopy address={action.transfer.sender} />
              )}
            </Field>
          )}
          <Field>
            <Label>To:</Label>
            {walletAddress === action.transfer.recipient ? (
              <Text>You</Text>
            ) : (
              <AddressWithCopy address={action.transfer.recipient} />
            )}
          </Field>
        </>
      )}
    </Container>
  )
}

export default memo(ActionCell)
