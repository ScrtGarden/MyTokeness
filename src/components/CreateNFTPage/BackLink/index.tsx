import Router from 'next/router'
import { FC, memo } from 'react'

import { Container, Label, StyledIcon } from './styles'

type Props = {
  label?: string
  to?: string
  className?: string
}

const BackLink: FC<Props> = (props) => {
  const { to, label, className } = props
  const onClick = () => (to ? Router.push(to) : Router.back())

  return (
    <Container onClick={onClick} className={className}>
      <StyledIcon name="arrow-left" />
      <Label>{label}</Label>
    </Container>
  )
}

export default memo(BackLink)
