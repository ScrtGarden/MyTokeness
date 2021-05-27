import { FC, memo } from 'react'

import {
  Input,
  Message,
  MessageIcon,
  MessageWrapper,
} from '../../../../UI/Forms'
import { Attribute } from '../../../Store/model'
import { Container, Wrapper } from './styles'

type Props = {
  index: number
  attribute: Attribute
  onChange: (params: { index: number; data: Attribute }) => void
  error?: string
}

const Item: FC<Props> = (props) => {
  const {
    attribute: { key, value },
    index,
    onChange,
    error,
  } = props

  return (
    <Container>
      <Wrapper>
        <Input
          placeholder="type"
          value={key}
          onChange={(e) =>
            onChange({ index, data: { key: e.currentTarget.value, value } })
          }
          validation={error ? 'error' : undefined}
        />
        <Input
          placeholder="fire"
          value={value}
          onChange={(e) =>
            onChange({ index, data: { value: e.currentTarget.value, key } })
          }
          validation={error ? 'error' : undefined}
        />
      </Wrapper>
      {error && (
        <MessageWrapper>
          <MessageIcon name="exclamation-circle" validation="error" />
          <Message validation="error">{error}</Message>
        </MessageWrapper>
      )}
    </Container>
  )
}

export default memo(Item)
