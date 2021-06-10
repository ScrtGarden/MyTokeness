import { FC } from 'react'
import styled from 'styled-components'
import ReactModal, { ModalProps } from 'styled-react-modal'

import Icon from '../../Icons'
import { IconButton } from '../Buttons'

interface TitleProps {
  readonly isDanger?: boolean
}

interface IconProps {
  readonly danger?: string
}

interface ButtonsProps {
  readonly single?: boolean
}

type Props = {
  className?: string
} & ModalProps

const Modal: FC<Props> = ({ children, className, ...rest }) => (
  <ReactModal {...rest}>
    <StyledModal className={className}>{children}</StyledModal>
  </ReactModal>
)

const ModalBackground = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.modal.overlay.bg};
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 30;
`

const StyledModal = styled.div`
  background: ${(props) => props.theme.modal.card.bg};
  border-radius: ${(props) => props.theme.border.radii.md};
  border: ${(props) => props.theme.modal.card.border};
  position: relative;
  max-width: 450px;
  width: 90%;
`

const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.modal.header.border.color};
  column-gap: ${(props) => props.theme.space.sm};
  display: flex;
  padding: ${(props) => props.theme.space.lg};
`

const StyledIcon = styled(Icon)<IconProps>`
  fill: ${(props) =>
    props.danger === 'true'
      ? props.theme.icon.colors.warn
      : props.theme.icon.colors.primary};
  height: 1.8rem;
  width: 1.8rem;
`

const Title = styled.h1<TitleProps>`
  color: ${(props) =>
    props.isDanger
      ? props.theme.font.colors.warn
      : props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  margin: 0;
`

const Content = styled.div`
  max-height: 600px;
  overflow: scroll;
  padding: ${(props) => props.theme.space.lg};
`

const Text = styled.p`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.md};
  line-height: ${(props) => props.theme.font.lineHeights.md};
  margin: 0;
`

const Buttons = styled.div<ButtonsProps>`
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  justify-content: flex-end;
  padding: ${(props) =>
    `0 ${props.theme.space.lg} ${props.theme.space.lg} ${props.theme.space.lg}`};
`

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 20px;

  svg {
    fill: ${(props) => props.theme.icon.colors.secondary};
    height: 16px;
    width: 16px;
  }
`

export {
  ModalBackground,
  Modal,
  Title,
  Header,
  Content,
  Text,
  StyledIcon,
  Buttons,
  CloseButton,
}
