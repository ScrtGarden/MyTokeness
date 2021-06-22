import { FC, memo, useMemo } from 'react'

import truncateAddress from '../../../../utils/truncateAddress'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'
import { IconButton, StyledIcon } from '../../UI/Buttons'
import { Address, Container } from './styles'

type Props = {
  address: string
}

const AddressWithCopy: FC<Props> = ({ address }) => {
  const truncated = useMemo(() => truncateAddress(address), [address])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copy] = useCopyToClipboard(address)

  return (
    <Container>
      <Address>{truncated}</Address>
      <IconButton onClick={copy} size="small">
        <StyledIcon name="copy-duo" width={12} height={12} />
      </IconButton>
    </Container>
  )
}

export default memo(AddressWithCopy)
