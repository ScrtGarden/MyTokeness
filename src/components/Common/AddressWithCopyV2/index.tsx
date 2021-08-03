import { TippyProps } from '@tippyjs/react'
import { FC, memo, useMemo } from 'react'

import truncateAddress from '../../../../utils/truncateAddress'
import useCopyToClipboard, {
  CopyStatus,
} from '../../../hooks/useCopyToClipboard'
import Tooltip from '../../UI/Tooltip'
import { Address, Container, Text } from './styles'

type Props = {
  address: string
} & TippyProps

const Content: FC<{ address: string; status: CopyStatus }> = ({
  address,
  status,
}) =>
  status === 'copied' ? (
    <Text md bold>
      Address copied!
    </Text>
  ) : (
    <>
      {' '}
      <Text md bold>
        Copy to clipboard
      </Text>
      <Text>{address}</Text>
    </>
  )

const AddressWithCopy: FC<Props> = ({ address, placement = 'auto' }) => {
  const truncated = useMemo(() => truncateAddress(address), [address])
  const [status, copy] = useCopyToClipboard(address)

  return (
    <Container>
      <Tooltip
        content={<Content address={address} status={status} />}
        interactive
        placement={placement}
        hideOnClick={false}
      >
        <Address onClick={copy}>{truncated}</Address>
      </Tooltip>
    </Container>
  )
}

export default memo(AddressWithCopy)
