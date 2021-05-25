import { FC, memo } from 'react'

import { Card } from '../../UI/Card'
import { Container, Label, StyledIcon } from './styles'

type Props = {
  name: string
  icon: string
  contractAddress?: string
  onClick: () => void
}

const Collection: FC<Props> = ({ name, icon, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Label>{name}</Label>
      <StyledIcon name={icon} />
    </Container>
  )
}

export default memo(Collection)
