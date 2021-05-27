import { memo } from 'react'

import { Card, Header } from '../../../UI/Card'

const Public = () => {
  return (
    <Card>
      <Header>Private Data</Header>
    </Card>
  )
}

export default memo(Public)
