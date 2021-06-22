import { FC, memo } from 'react'

import { Tx } from '../../../../../../interface/nft'
import truncateAddress from '../../../../../../utils/truncateAddress'
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
            <Text>
              {walletAddress === action.mint.minter
                ? 'You'
                : truncateAddress(action.mint.minter)}
            </Text>
          </Field>
          <Field>
            <Label>Recipient:</Label>
            <Text>
              {walletAddress === action.mint.recipient
                ? 'You'
                : truncateAddress(action.mint.recipient)}
            </Text>
          </Field>
        </>
      )}

      {'burn' in action && (
        <>
          <Title red>Burn</Title>
          <Field>
            <Label>Owner:</Label>
            <Text>
              {walletAddress === action.burn.owner
                ? 'You'
                : truncateAddress(action.burn.owner)}
            </Text>
          </Field>
          {action.burn.burner && (
            <Field>
              <Label>Burner:</Label>
              <Text>
                {walletAddress === action.burn.burner
                  ? 'You'
                  : truncateAddress(action.burn.burner)}
              </Text>
            </Field>
          )}
        </>
      )}

      {'transfer' in action && (
        <>
          <Title yellow>Transfer</Title>
          <Field>
            <Label>From:</Label>
            <Text>
              {walletAddress === action.transfer.from
                ? 'You'
                : truncateAddress(action.transfer.from)}
            </Text>
          </Field>
          {action.transfer.sender && (
            <Field>
              <Label>To:</Label>
              <Text>
                {walletAddress === action.transfer.sender
                  ? 'You'
                  : truncateAddress(action.transfer.sender)}
              </Text>
            </Field>
          )}
          <Field>
            <Label>To:</Label>
            <Text>
              {walletAddress === action.transfer.recipient
                ? 'You'
                : truncateAddress(action.transfer.recipient)}
            </Text>
          </Field>
        </>
      )}
    </Container>
  )
}

export default memo(ActionCell)
