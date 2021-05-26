import { FC, memo } from 'react'
import { ModalProps } from 'styled-react-modal'

import Icon from '../../Icons'
import { Button } from '../../UI/Buttons'
import {
  Buttons,
  CloseButton,
  Content,
  Header,
  StyledIcon,
  Text,
  Title,
} from '../../UI/Modal'
import { StyledModal } from './styles'

type Props = {
  title?: string
  text?: string
  toggle: () => void
  onClickPrimary: () => void
} & ModalProps

const WarningModal: FC<Props> = (props) => {
  const { toggle, onClickPrimary, title, text, ...rest } = props

  return (
    <StyledModal {...rest}>
      <Header>
        <StyledIcon name="exclamation-circle" danger="true" />
        <Title isDanger>{title}</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      <Content>
        <Text>{text}</Text>
      </Content>
      <Buttons>
        <Button onClick={toggle}>Cancel</Button>
        <Button onClick={onClickPrimary} isDanger>
          Remove
        </Button>
      </Buttons>
    </StyledModal>
  )
}

export default memo(WarningModal)
