import { FC, memo } from 'react'

import MessageWithIcon from '../../../../Common/MessageWithIcon'
import { Input } from '../../../../UI/Forms'
import { SetBalancePayload } from '../../../Store/model'
import { Container, Field, Position, Wrapper } from './styles'

type Props = {
  address: string
  amount: string
  index: number
  onChange: (payload: SetBalancePayload) => void
  errors: { address: string; amount: string }
}

const Item: FC<Props> = ({ address, amount, index, onChange, errors }) => (
  <Container>
    <Position>{index + 1}</Position>
    <Wrapper>
      <Field>
        <Input
          isCompact
          placeholder="Wallet Address"
          onChange={(e) =>
            onChange({ index, data: { address: e.currentTarget.value } })
          }
          value={address}
        />
        {errors.address && (
          <MessageWithIcon validation="error" message={errors.address} />
        )}
      </Field>
      <Field>
        <Input
          isCompact
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            onChange({ index, data: { amount: e.currentTarget.value } })
          }
        />
        {errors.amount && (
          <MessageWithIcon validation="error" message={errors.amount} />
        )}
      </Field>
    </Wrapper>
  </Container>
)

export default memo(Item)
