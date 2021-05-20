import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, memo, useMemo, useState } from 'react'
import { useSpring, useTransition } from 'react-spring'
import useDimensions from 'react-use-dimensions'

import Item from './Item'
import { Container, Header, Label, Menu, StyledIcon, Wrapper } from './styles'

interface Item {
  label: string
  icon: string
  route?: string
  menu?: {
    label: string
    icon: string
    route: string
    as?: string
  }[]
}

type Props = {
  item: Item
  id: string
}

const isMatch = (path: string, id: string) => {
  const arr = path.split('/')
  const checkId = id === '/' ? '' : id
  return arr[1] === checkId
}

const Tab: FC<Props> = (props) => {
  const { item, id } = props
  const { icon, label, menu, route } = item

  const router = useRouter()
  const selected = useMemo(() => isMatch(router.asPath, id), [router])

  const [ref, dimensions] = useDimensions()

  // component state
  const [open, setOpen] = useState(selected)

  // react spring
  const { height } = useSpring({
    height: open ? (dimensions.height || 0) + 60 : 60,
  })
  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const onClickHeader = () => {
    route ? router.push(route, undefined, { shallow: true }) : setOpen(!open)
  }

  return (
    <Container style={{ height }}>
      <Header selected={selected} onClick={onClickHeader}>
        <Wrapper>
          <StyledIcon name={icon} />
          <Label>{label}</Label>
        </Wrapper>
        {menu && (
          <StyledIcon small="true" name={open ? 'caret-up' : 'caret-down'} />
        )}
      </Header>
      {menu &&
        transitions(
          (_, item) =>
            item && (
              <Menu ref={ref}>
                {menu.map((item, index) => (
                  <Link
                    key={index}
                    href={item.route}
                    as={item.as}
                    shallow={true}
                  >
                    <Item
                      label={item.label}
                      icon={item.icon}
                      selected={router.asPath === (item.as || item.route)}
                    />
                  </Link>
                ))}
              </Menu>
            )
        )}
    </Container>
  )
}

export default memo(Tab)
