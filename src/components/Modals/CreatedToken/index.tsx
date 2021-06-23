import { FC, memo } from 'react'
import { toast } from 'react-toastify'

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

type Props = {
  toggle?: () => void
  contractAddress: string
}

const CreatedToken: FC<Props> = (props) => {
  const { toggle = () => null, contractAddress } = props

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
    <>
      <Header>
        <Title>Congratulation!</Title>
        <CloseButton onClick={toggle}>
          <StyledIcon name="times" />
        </CloseButton>
      </Header>
      <Content>
        <Text>
          You have successfully created a privacy token. To view it in your
          Keplr Wallet, a viewing key is required. Would you like to create one
          now?
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
    </>
  )
}

export default memo(CreatedToken)
