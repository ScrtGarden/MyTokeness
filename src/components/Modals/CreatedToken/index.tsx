import { FC, memo } from 'react'
import { toast } from 'react-toastify'
import { ModalProps } from 'styled-react-modal'

import parseErrorMsg from '../../../../utils/parseErrorMsg'
import useMutationSuggestToken from '../../../hooks/useMutationSuggestToken'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import { Button, StyledIcon } from '../../UI/Buttons'
import {
  Buttons,
  CloseButton,
  Content,
  Header,
  Text,
  Title,
} from '../../UI/Modal'
import { StyledModal } from './styles'

type Props = {
  toggle?: () => void
  contractAddress: string
} & ModalProps

const CreatedTokenModal: FC<Props> = (props) => {
  const { toggle = () => null, contractAddress, ...rest } = props

  // custom hooks
  const { mutate, isLoading } = useMutationSuggestToken()

  const onClickGetViewingKey = () => {
    mutate(contractAddress, {
      onSuccess: () => {
        toast.success('Created viewing key.')
        toggle()
      },
      onError: (error) => {
        toast.error(parseErrorMsg(error))
      },
    })
  }

  return (
    <StyledModal {...rest}>
      <Header>
        <Title>Congratulation!</Title>
        <CloseButton onClick={toggle}>
          <StyledIcon name="times" />
        </CloseButton>
      </Header>
      <Content>
        <Text>
          You have successfully created a snip20 token. Due to its inherent
          private properties, you need to create a viewing key to view the
          token. Would you like to create one now?
        </Text>
      </Content>
      <Buttons>
        <Button onClick={toggle} disabled={isLoading}>
          Not Now
        </Button>
        <ButtonWithLoading
          text="Lets Go"
          isPrimary
          width={75}
          loading={isLoading}
          onClick={onClickGetViewingKey}
        />
      </Buttons>
    </StyledModal>
  )
}

export default memo(CreatedTokenModal)
