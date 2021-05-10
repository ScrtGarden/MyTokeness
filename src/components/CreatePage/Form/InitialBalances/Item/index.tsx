import { FC, memo } from 'react'

import { Input } from '../../../../UI/Forms'
import { SetBalancePayload } from '../../../Store/model'
import { Container, Position, Wrapper } from './styles'

type Props = {
  address: string
  amount: string
  index: number
  onChange: (payload: SetBalancePayload) => void
}

const Item: FC<Props> = ({ address, amount, index, onChange }) => (
  <Container>
    <Position>{index + 1}</Position>
    <Wrapper>
      <Input
        isCompact
        placeholder="Wallet Address"
        onChange={(e) =>
          onChange({ index, data: { address: e.currentTarget.value } })
        }
        value={address}
      />
      <Input
        isCompact
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          onChange({ index, data: { amount: e.currentTarget.value } })
        }
      />
    </Wrapper>
  </Container>
)

export default memo(Item)
