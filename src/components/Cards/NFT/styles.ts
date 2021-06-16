import styled from 'styled-components'

import { Modal } from '../../UI/Modal'

const Container = styled.div`
  aspect-ratio: 0.9;
  border: 2px solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radii.md};
  background: ${(props) => props.theme.fg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: ${(props) => props.theme.space.sm};
`

const StyledModal = styled(Modal)`
  max-width: 725px;
`

export { Container, Wrapper, StyledModal }
