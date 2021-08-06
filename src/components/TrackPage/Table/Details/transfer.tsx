import { format } from 'date-fns'
import { FC, memo } from 'react'

import { Tx } from '../../../../../interface/snip20'
import { DETAILED_DATE_FORMAT } from '../../../../../utils/constants'
import AddressWithCopy from '../../../Common/AddressWithCopyV2'
import { Cell } from '../../../UI/Table'
import { Text } from '../../../UI/Typography'
import { Attributes, Title } from './styles'

type Props = {
  data: Tx
}

const TransferDetails: FC<Props> = ({
  data: { block_time, block_height, from, receiver, sender, memo },
}) => (
  <>
    <Cell />
    <Cell colSpan={2}>
      <Title>Transfer Details</Title>
      <Attributes>
        <Text>Date</Text>
        <Text>
          {block_time ? format(block_time * 1000, DETAILED_DATE_FORMAT) : '--'}
        </Text>
        <Text>Block height</Text>
        <Text>{block_height || '--'}</Text>
        <Text>From</Text>
        <AddressWithCopy address={from} placement="right" />
        <Text>Sender</Text>
        <AddressWithCopy address={sender} placement="right" />
        <Text>Receiver</Text>
        <AddressWithCopy address={receiver} placement="right" />
        <Text>Memo</Text>
        <Text>{memo || '--'}</Text>
      </Attributes>
    </Cell>
  </>
)

export default memo(TransferDetails)
