import { format } from 'date-fns'
import { FC, memo, useMemo } from 'react'

import { RichTx } from '../../../../../interface/snip20'
import { DETAILED_DATE_FORMAT } from '../../../../../utils/constants'
import AddressWithCopy from '../../../Common/AddressWithCopyV2'
import { Cell } from '../../../UI/Table'
import { Text } from '../../../UI/Typography'
import { parseTransaction } from '../lib'
import { Attributes, Title } from './styles'

type Props = {
  data: RichTx
}

const TransactionDetails: FC<Props> = ({
  data: { block_time, block_height, action, memo },
}) => {
  const { type, from, recipient, sender, burner, minter, owner } = useMemo(
    () => parseTransaction(action),
    [action]
  )

  return (
    <>
      <Cell />
      <Cell colSpan={2}>
        <Title>Transaction Details</Title>
        <Attributes>
          <Text>Date</Text>
          <Text>
            {block_time
              ? format(block_time * 1000, DETAILED_DATE_FORMAT)
              : '--'}
          </Text>
          <Text>Block height</Text>
          <Text>{block_height || '--'}</Text>
          <Text>Type</Text>
          <Text caps>{type}</Text>
          {from && (
            <>
              <Text>From</Text>
              <AddressWithCopy address={from} placement="right" />
            </>
          )}
          {sender && (
            <>
              <Text>Sender</Text>
              <AddressWithCopy address={sender} placement="right" />
            </>
          )}
          {owner && (
            <>
              <Text>Owner</Text>
              <AddressWithCopy address={owner} placement="right" />
            </>
          )}
          {burner && (
            <>
              <Text>Burner</Text>
              <AddressWithCopy address={burner} placement="right" />
            </>
          )}
          {minter && (
            <>
              <Text>Minter</Text>
              <AddressWithCopy address={minter} placement="right" />
            </>
          )}
          {recipient && (
            <>
              <Text>Recipient</Text>
              <AddressWithCopy address={recipient} placement="right" />
            </>
          )}
          <Text>Memo</Text>
          <Text>{memo || '--'}</Text>
        </Attributes>
      </Cell>
    </>
  )
}

export default memo(TransactionDetails)
