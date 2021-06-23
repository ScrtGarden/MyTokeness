import { FC, memo } from 'react'

import MessageWithIcon from '../../../../Common/MessageWithIcon'
import { Input } from '../../../../UI/Forms'
import { Attribute } from '../../../Store/model'
import { Container, Wrapper } from './styles'

type Props = {
  index: number
  attribute: Attribute
  onChange: (params: { index: number; data: Attribute }) => void
  error?: string
}

const Item: FC<Props> = ({
  attribute: { key, value },
  index,
  onChange,
  error,
}) => (
  <Container>
    <Wrapper>
      <Input
        placeholder="Type"
        value={key}
        onChange={(e) =>
          onChange({ index, data: { key: e.currentTarget.value, value } })
        }
        validation={error ? 'error' : undefined}
      />
      <Input
        placeholder="Fire"
        value={value}
        onChange={(e) =>
          onChange({ index, data: { value: e.currentTarget.value, key } })
        }
        validation={error ? 'error' : undefined}
      />
    </Wrapper>
    {error && <MessageWithIcon validation="error" message={error} />}
  </Container>
)

export default memo(Item)
