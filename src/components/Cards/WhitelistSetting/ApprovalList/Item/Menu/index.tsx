import { FC, memo } from 'react'

import { Container, Item } from '../../../../../UI/Dropdowns/Menu/styles'

type Props = {
  onClickEdit: () => void
  onClickRemove: () => void
}

const Menu: FC<Props> = ({ onClickEdit, onClickRemove }) => {
  return (
    <Container>
      <Item onClick={onClickEdit}>Edit</Item>
      <Item isDanger onClick={onClickRemove}>
        Remove
      </Item>
    </Container>
  )
}

export default memo(Menu)
