import Tippy, { TippyProps } from '@tippyjs/react/headless'
import { FC, memo } from 'react'

import { Button, Content } from './styles'

const Tooltip: FC<TippyProps> = (props) => {
  const { children, content, ...rest } = props

  return (
    <Tippy
      render={(attrs) => (
        <Content tabIndex={-1} {...attrs}>
          {content}
        </Content>
      )}
      {...rest}
    >
      <Button>{children}</Button>
    </Tippy>
  )
}

export default memo(Tooltip)
