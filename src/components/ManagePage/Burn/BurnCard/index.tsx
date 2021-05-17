import { FC, FormEvent, memo } from 'react'

import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Field, Input, InputGroup, Label, Symbol } from '../../../UI/Forms'
import { StyledDots } from '../../../UI/Loaders'

type Props = {
  amount: string
  memo: string
  onChangeAmount: (e: FormEvent<HTMLInputElement>) => void
  onChangeMemo: (e: FormEvent<HTMLInputElement>) => void
  onSubmit: () => void
  isLoadingSymbol?: boolean
  isBurning?: boolean
  symbol?: string
  enableButton?: boolean
  error?: string
}

const BurnCard: FC<Props> = ({
  amount,
  memo,
  onChangeAmount,
  onChangeMemo,
  onSubmit,
  isLoadingSymbol,
  isBurning,
  symbol,
  enableButton,
  error,
}) => {
  return (
    <Card>
      <Header>Burn Tokens</Header>
      <Wrapper>
        <Field>
          <Label>Amount</Label>
          <InputGroup>
            <Input placeholder="0.0" value={amount} onChange={onChangeAmount} />
            <Symbol>
              {isLoadingSymbol && <StyledDots />}
              {!isLoadingSymbol && !symbol && '--'}
              {!isLoadingSymbol && symbol}
            </Symbol>
          </InputGroup>
          {error && <MessageWithIcon validation="error" message={error} />}
        </Field>
        <Field>
          <Label>Memo (optional)</Label>
          <Input
            placeholder="Lower supply"
            value={memo}
            onChange={onChangeMemo}
          />
        </Field>
        <ButtonWithLoading
          text="Burn"
          isPrimary
          onClick={onSubmit}
          loading={isBurning}
          disabled={!enableButton}
        />
      </Wrapper>
    </Card>
  )
}

export default memo(BurnCard)
