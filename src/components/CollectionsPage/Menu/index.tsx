import { FC, memo } from 'react'

import { Container, Item } from '../../UI/Dropdowns/Menu/styles'

type Props = {
  onClickAdd: () => void
  onClickCreate: () => void
}

const Menu: FC<Props> = ({ onClickAdd, onClickCreate }) => {
  return (
    <Container>
      <Item onClick={onClickAdd}>Add</Item>
      <Item onClick={onClickCreate}>Create</Item>
    </Container>
  )
}

export default memo(Menu)
