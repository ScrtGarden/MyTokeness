import { format } from 'date-fns'
import { FC } from 'react'

import { UIExpiration } from '../../../../../../interface/nft-ui'
import { DATE_FORMAT } from '../../../../../../utils/constants'
import { Container, Expiration } from './styles'

type Props = {
  expiration: UIExpiration
}

const PrivacyTooltip: FC<Props> = ({ expiration }) => {
  const { type, date, blockheight } = expiration
  let value
  if (type === 'never') {
    value = 'never'
  } else if (type === 'date') {
    value = format(date, DATE_FORMAT)
  } else {
    value = `blockheight ${blockheight}`
  }

  return (
    <Container>
      Public ownership
      <Expiration>Exp: {value}</Expiration>
    </Container>
  )
}

export default PrivacyTooltip
