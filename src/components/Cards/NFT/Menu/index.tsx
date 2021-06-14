import { FC } from 'react'

import { Container, Item } from '../../../UI/Dropdowns/Menu/styles'

type Props = {
  onClickUnseal: () => void
}

const Menu: FC<Props> = ({ onClickUnseal }) => {
  return (
    <Container>
      <Item onClick={onClickUnseal}>Unseal</Item>
      <Item>Ownership setting</Item>
      <Item>Private metadata setting</Item>
      <Item>Whitelist</Item>
    </Container>
  )
}

export default Menu
