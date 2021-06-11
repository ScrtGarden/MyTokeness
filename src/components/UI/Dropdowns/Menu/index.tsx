import Tippy from '@tippyjs/react/headless'
import { FC, cloneElement, memo } from 'react'
import { Placement } from 'tippy.js'

type Props = {
  isOpen: boolean
  toggle: () => void
  children: JSX.Element
  placement?: Placement
  offset?: [number, number]
  content?: JSX.Element | string
}

const Dropdown: FC<Props> = (props) => {
  const {
    children,
    placement = 'auto',
    offset = [0, 10],
    content,
    isOpen,
    toggle,
  } = props

  return (
    <Tippy
      render={(attrs) => (
        <div tabIndex={-1} {...attrs}>
          {content}
        </div>
      )}
      visible={isOpen}
      onClickOutside={toggle}
      placement={placement}
      offset={offset}
      interactive
    >
      {cloneElement(children, { onClick: toggle })}
    </Tippy>
  )
}

export default memo(Dropdown)
