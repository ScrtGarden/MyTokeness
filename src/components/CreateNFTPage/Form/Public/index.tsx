import { memo } from 'react'

import { Card, Header, Wrapper } from '../../../UI/Card'

const Public = () => {
  return (
    <Card>
      <Header>Public Data</Header>
      <Wrapper></Wrapper>
    </Card>
  )
}

export default memo(Public)
