import { FC, memo } from 'react'

import { Label } from '../../../UI/Forms'
import { Attribute } from '../../Store/model'
import Item from './Item'
import { Container, List } from './styles'

type Props = {
  data: Attribute[]
  onChange: (params: { index: number; data: Attribute }) => void
  errors?: string[]
}

const AttributeList: FC<Props> = (props) => {
  const { data, onChange, errors } = props

  return (
    <Container>
      <Label>Properties (optional)</Label>
      <List>
        {data.map((attribute, index) => (
          <Item
            key={index}
            attribute={attribute}
            index={index}
            onChange={onChange}
            // error={errors[index]}
          />
        ))}
      </List>
    </Container>
  )
}

export default memo(AttributeList)
