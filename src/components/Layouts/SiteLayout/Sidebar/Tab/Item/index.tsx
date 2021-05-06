import { FC, forwardRef, memo } from 'react'

import { Container, Label, StyledIcon } from './styles'

type Props = {
  label?: string
  icon?: string
  selected?: boolean
}

const Item: FC<Props> = memo(
  forwardRef((props, _) => {
    const { icon, label, selected, ...rest } = props
    return (
      <Container selected={selected} {...rest}>
        <StyledIcon name={icon} />
        <Label>{label}</Label>
      </Container>
    )
  })
)

export default Item
