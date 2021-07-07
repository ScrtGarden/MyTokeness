import { FC, forwardRef, memo } from 'react'

import { IconName } from '../../../../../Icons'
import { Container, Label, StyledIcon } from './styles'

type Props = {
  label?: string
  icon?: IconName
  selected?: boolean
}

const Item: FC<Props> = memo(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
