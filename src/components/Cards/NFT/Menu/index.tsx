import { FC } from 'react'

import { Container, Item } from '../../../UI/Dropdowns/Menu/styles'

type Props = {
  onClickUnseal: () => void
  showUnseal: boolean
  onClickOwnership: () => void
  onClickPrivateContents: () => void
  onClickWhitelist: () => void
  onClickTransfer: () => void
  showBurn: boolean
  onClickBurn: () => void
}

const Menu: FC<Props> = ({
  onClickUnseal,
  showUnseal,
  onClickOwnership,
  onClickPrivateContents,
  onClickWhitelist,
  onClickTransfer,
  showBurn,
  onClickBurn,
}) => (
  <Container>
    {showUnseal && <Item onClick={onClickUnseal}>Unseal</Item>}
    <Item onClick={onClickOwnership}>Ownership setting</Item>
    <Item onClick={onClickPrivateContents}>Private contents setting</Item>
    <Item onClick={onClickWhitelist}>Whitelist</Item>
    <Item onClick={onClickTransfer}>Transfer</Item>
    {showBurn && (
      <Item isDanger onClick={onClickBurn}>
        Burn
      </Item>
    )}
  </Container>
)

export default Menu
