import { FC } from 'react'

import { Container, Item } from '../../../UI/Dropdowns/Menu/styles'

type Props = {
  onClickUnseal: () => void
  showUnseal: boolean
}

const Menu: FC<Props> = ({ onClickUnseal, showUnseal }) => {
  return (
    <Container>
      {showUnseal && <Item onClick={onClickUnseal}>Unseal</Item>}
      <Item>Ownership setting</Item>
      <Item>Private metadata setting</Item>
      <Item>Whitelist</Item>
      <Item>Transfer</Item>
    </Container>
  )
}

export default Menu
