import { FC, FormEvent, memo } from 'react'

import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Field, Input, InputGroup, Label, Symbol } from '../../../UI/Forms'
import { StyledDots } from '../../../UI/Loaders'

type Props = {
  symbol?: string
  amount: string
  onChangeAmount: (e: FormEvent<HTMLInputElement>) => void
  recipient: string
  onChangeRecipient: (e: FormEvent<HTMLInputElement>) => void
  errors?: { amount: string; recipient: string }
  isLoading?: boolean
  enableButton?: boolean
  onSubmit?: () => void
  isMinting?: boolean
}

const MintCard: FC<Props> = ({
  symbol,
  amount,
  onChangeAmount,
  recipient,
  onChangeRecipient,
  errors,
  isLoading,
  enableButton,
  onSubmit,
  isMinting,
}) => {
  return (
    <Card>
      <Header>Mint</Header>
      <Wrapper>
        <Field>
          <Label>Recipient</Label>
          <Input
            value={recipient}
            onChange={onChangeRecipient}
            placeholder="secret1gvjcte2asddt09394s3r2aqhllgchg4608fmew"
          />
          {errors?.recipient && (
            <MessageWithIcon validation="error" message={errors.recipient} />
          )}
        </Field>
        <Field>
          <Label>Amount</Label>
          <InputGroup>
            <Input value={amount} onChange={onChangeAmount} placeholder="0.0" />
            <Symbol>
              {isLoading && <StyledDots />}
              {!isLoading && !symbol && '--'}
              {!isLoading && symbol}
            </Symbol>
          </InputGroup>
          {errors?.amount && (
            <MessageWithIcon validation="error" message={errors.amount} />
          )}
        </Field>
        <ButtonWithLoading
          text="Mint"
          isPrimary
          disabled={!enableButton}
          onClick={onSubmit}
          loading={isMinting}
        />
      </Wrapper>
    </Card>
  )
}

export default memo(MintCard)
