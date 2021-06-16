import { FC } from 'react'

import { Container, Item } from '../../../UI/Dropdowns/Menu/styles'

type Props = {
  onClickUnseal: () => void
  showUnseal: boolean
  onClickOwnership: () => void
  onClickPrivateContents: () => void
  onClickWhitelist: () => void
  onClickTransfer: () => void
}

const Menu: FC<Props> = ({
  onClickUnseal,
  showUnseal,
  onClickOwnership,
  onClickPrivateContents,
  onClickWhitelist,
  onClickTransfer,
}) => (
  <Container>
    {showUnseal && <Item onClick={onClickUnseal}>Unseal</Item>}
    <Item onClick={onClickOwnership}>Ownership setting</Item>
    <Item onClick={onClickPrivateContents}>Private contents setting</Item>
    <Item onClick={onClickWhitelist}>Whitelist</Item>
    <Item onClick={onClickTransfer}>Transfer</Item>
    {!showUnseal && <Item>View private contents</Item>}
  </Container>
)

export default Menu
