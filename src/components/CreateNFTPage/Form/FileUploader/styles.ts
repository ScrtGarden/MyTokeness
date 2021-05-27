import styled from 'styled-components'

import { IconButton } from '../../../UI/Buttons'
import { FileUpload } from '../../../UI/Forms'

const Wrapper = styled.div`
  aspect-ratio: 16/9;
  display: flex;
  margin-top: ${(props) => props.theme.space.sm};
  position: relative;
  max-width: 400px;
`

const StyledFileUpload = styled(FileUpload)`
  display: flex;
  flex: 1;
`

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;

  svg {
    height: 16px;
    width: 16px;
  }
`

export { StyledFileUpload, Wrapper, CloseButton }
