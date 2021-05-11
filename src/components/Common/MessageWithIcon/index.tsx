import { FC, memo } from 'react'

import { Message, MessageIcon, MessageWrapper } from '../../UI/Forms'

type Props = {
  validation?: 'error' | 'success'
  message?: string
}

const MessageWithIcon: FC<Props> = ({ validation, message }) => (
  <MessageWrapper>
    <MessageIcon
      name={validation === 'error' ? 'exclamation-circle' : undefined}
      validation={validation}
    />
    <Message validation="error">{message}</Message>
  </MessageWrapper>
)

export default memo(MessageWithIcon)
