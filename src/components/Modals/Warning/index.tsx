import { FC, memo } from 'react'

import ButtonWithLoading from '../../Common/ButtonWithLoading'
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
  loading?: boolean
  buttonWidth?: number
}

const WarningModal: FC<Props> = ({
  toggle,
  onClickPrimary,
  title,
  text,
  loading,
  buttonWidth,
}) => (
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
      <ButtonWithLoading
        text="Remove"
        onClick={onClickPrimary}
        isDanger
        loading={loading}
        width={buttonWidth}
      />
    </Buttons>
  </>
)

export default memo(WarningModal)
