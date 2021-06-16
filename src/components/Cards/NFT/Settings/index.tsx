import { FC, memo } from 'react'

import { UIExpiration } from '../../../../../interface/nft-ui'
import Tooltip from '../../../UI/Tooltip'
import PrivacyTooltip from './PrivacyTooltip'
import { Container, Section, StyledIcon } from './styles'

type Props = {
  enabledSealedData?: boolean
  isSealed: boolean
  hiddenOwnership: boolean
  ownershipExpiration: UIExpiration
  hiddenPrivateMetadata: boolean
  privateMetadataExpiration: UIExpiration
  numOfWhitelistedAddresses: number
}

const SIZE = 16

const Settings: FC<Props> = ({
  enabledSealedData,
  isSealed,
  hiddenOwnership,
  ownershipExpiration,
  hiddenPrivateMetadata,
  privateMetadataExpiration,
  numOfWhitelistedAddresses,
}) => (
  <Container>
    <Section>
      <Tooltip
        content={
          hiddenOwnership ? (
            'Hidden ownership'
          ) : (
            <PrivacyTooltip
              expiration={ownershipExpiration}
              label="Public ownership"
            />
          )
        }
        placement="top-start"
      >
        <StyledIcon
          name="user-shield-duo"
          width={SIZE}
          height={SIZE}
          disabled={!hiddenOwnership}
        />
      </Tooltip>
      <Tooltip
        content={
          hiddenPrivateMetadata ? (
            'Hidden private contents'
          ) : (
            <PrivacyTooltip
              expiration={privateMetadataExpiration}
              label="Public private contents"
            />
          )
        }
        placement="top-start"
      >
        <StyledIcon
          name="shield-duo"
          width={SIZE}
          height={SIZE}
          disabled={!hiddenPrivateMetadata}
        />
      </Tooltip>
    </Section>
    <Section>
      {numOfWhitelistedAddresses !== 0 && (
        <Tooltip
          content={`${numOfWhitelistedAddresses} whitelisted address${
            numOfWhitelistedAddresses === 1 ? '' : 'es'
          }`}
          placement="top-end"
        >
          <StyledIcon name="list-ul-duo" width={SIZE} height={SIZE} />
        </Tooltip>
      )}
      {enabledSealedData && (
        <Tooltip content={isSealed ? 'Sealed' : 'Unsealed'} placement="top-end">
          <StyledIcon
            name={isSealed ? 'lock-keyhole-duo' : 'lock-keyhole-open-duo'}
            width={SIZE}
            height={SIZE}
          />
        </Tooltip>
      )}
    </Section>
  </Container>
)

export default memo(Settings)
