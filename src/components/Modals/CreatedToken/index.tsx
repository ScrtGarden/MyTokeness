import { FC, memo } from 'react'
import { ModalProps } from 'styled-react-modal'

import ButtonWithLoading from '../../Common/ButtonWithLoading'
import { Button, StyledIcon } from '../../UI/Buttons'
import { Buttons, Content, Header, Text, Title } from '../../UI/Modal'
import { StyledIconButton, StyledModal } from './styles'

type Props = {
  toggle?: () => void
} & ModalProps

const CreatedTokenModal: FC<Props> = (props) => {
  const { toggle, ...rest } = props

  return (
    <StyledModal {...rest}>
      <Header>
        <Title>Congratulation!</Title>
        <StyledIconButton onClick={toggle}>
          <StyledIcon name="times" />
        </StyledIconButton>
      </Header>
      <Content>
        <Text>
          You have successfully created a snip20 token. Due to its inherent
          private properties, you need to create a viewing key to view the
          token. Would you like to create one now?
        </Text>
      </Content>
      <Buttons>
        <Button onClick={toggle}>Not Now</Button>
        <ButtonWithLoading text="Lets Go" isPrimary width={75} />
      </Buttons>
    </StyledModal>
  )
}

export default memo(CreatedTokenModal)
