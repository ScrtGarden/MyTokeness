import Tippy from '@tippyjs/react/headless'
import { FC, memo } from 'react'
import { Placement } from 'tippy.js'

import { Button, Content } from './styles'

type Props = {
  children?: JSX.Element
  placement?: Placement
  offset?: [number, number]
  content?: JSX.Element | string
}

const Tooltip: FC<Props> = (props) => {
  const { children, placement = 'auto', offset = [0, 10], content } = props

  return (
    <Tippy
      render={(attrs) => (
        <Content tabIndex={-1} {...attrs}>
          {content}
        </Content>
      )}
      placement={placement}
      offset={offset}
    >
      <Button>{children}</Button>
    </Tippy>
  )
}

export default memo(Tooltip)
