import { FC, memo } from 'react'

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

type Props = {
  title?: string
  text?: string
  toggle: () => void
  onClickPrimary: () => void
}

const WarningModal: FC<Props> = ({ toggle, onClickPrimary, title, text }) => (
  <>
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
  </>
)

export default memo(WarningModal)
