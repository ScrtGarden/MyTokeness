import { memo } from 'react'

import { Content } from '../../UI/Containers'
import Private from './Private'
import Public from './Public'

const Form = () => {
  return (
    <Content>
      <Public />
      <Private />
    </Content>
  )
}

export default memo(Form)
