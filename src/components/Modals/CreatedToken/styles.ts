import styled from 'styled-components'

import { IconButton } from '../../UI/Buttons'
import { Content, Modal, Text } from '../../UI/Modal'

const StyledModal = styled(Modal)`
  max-width: 450px;
  width: 90%;
`

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 20px;
`

export { StyledModal, StyledIconButton }
