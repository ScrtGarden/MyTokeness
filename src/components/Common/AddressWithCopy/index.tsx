import { FC, memo, useMemo } from 'react'

import truncateAddress from '../../../../utils/truncateAddress'
import CopyIconButton from '../CopyIconButton'
import { Address, Container } from './styles'

type Props = {
  address: string
}

const AddressWithCopy: FC<Props> = ({ address }) => {
  const truncated = useMemo(() => truncateAddress(address), [address])

  return (
    <Container>
      <Address>{truncated}</Address>
      <CopyIconButton toCopy={address} size="small" />
    </Container>
  )
}

export default memo(AddressWithCopy)
