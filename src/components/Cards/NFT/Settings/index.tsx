import { FC, memo } from 'react'

import Tooltip from '../../../UI/Tooltip'
import { Container, Section, StyledIcon } from './styles'

type Props = {
  enabledSealedData?: boolean
  isSealed: boolean
}

const SIZE = 16

const Settings: FC<Props> = ({ enabledSealedData, isSealed }) => {
  return (
    <Container>
      <Section>
        <Tooltip content="Hidden ownership" placement="top-start">
          <StyledIcon name="user-shield-duo" width={SIZE} height={SIZE} />
        </Tooltip>
        <Tooltip content="Hidden private metadata" placement="top-start">
          <StyledIcon name="shield-duo" width={SIZE} height={SIZE} />
        </Tooltip>
      </Section>
      <Section>
        {enabledSealedData && (
          <Tooltip
            content={isSealed ? 'Sealed' : 'Unsealed'}
            placement="top-end"
          >
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
}

export default memo(Settings)
