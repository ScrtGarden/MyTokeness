import { memo } from 'react'

import Tooltip from '../../../UI/Tooltip'
import { Container, Section, StyledIcon } from './styles'

const SIZE = 16

const Settings = () => {
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
        <Tooltip content="Sealed" placement="top-end">
          <StyledIcon name="lock-keyhole-duo" width={SIZE} height={SIZE} />
        </Tooltip>
      </Section>
    </Container>
  )
}

export default memo(Settings)
