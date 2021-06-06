import { FC, memo, useMemo, useState } from 'react'

import {
  UIExpiration,
  UISnip721Approval,
} from '../../../../../../interface/nft-ui'
import truncateAddress from '../../../../../../utils/truncateAddress'
import { IconButton, StyledIcon } from '../../../../UI/Buttons'
import { Row } from '../../../../UI/Table'
import Editor from './Editor'
import { parseData } from './lib'
import { Cell, StyledRow, Text } from './styles'

type Props = {
  item: UISnip721Approval
  isOpen?: boolean
  toggle: (address: string) => void
}

const Item: FC<Props> = ({ item, isOpen, toggle }) => {
  const { address, transfer, viewOwner, viewPrivateMetadata, expiration } = item

  // component state
  const parsedData = useMemo(
    () => parseData(transfer, viewOwner, viewPrivateMetadata, expiration),
    [item]
  )

  return (
    <>
      <StyledRow active={isOpen}>
        <Cell>
          <Text bold>{truncateAddress(address)}</Text>
        </Cell>
        <Cell>
          <Text>{parsedData.permissions}</Text>
        </Cell>
        <Cell>
          <Text>{parsedData.expirationLabel}</Text>
        </Cell>
        <Cell>
          <IconButton onClick={() => toggle(address)}>
            <StyledIcon name="ellipsis-v" />
          </IconButton>
        </Cell>
      </StyledRow>
      {isOpen && (
        <Row>
          <Editor
            expiration={expiration}
            options={parsedData.options}
            toggle={() => toggle(address)}
          />
        </Row>
      )}
    </>
  )
}

export default memo(Item)
