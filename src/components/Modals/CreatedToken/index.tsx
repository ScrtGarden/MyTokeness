import { FC, memo } from 'react'
import { ModalProps } from 'styled-react-modal'

import { Header, Title } from '../../UI/Modal'
import { StyledModal } from './styles'

type Props = {
  toggle?: () => void
} & ModalProps

const CreatedTokenModal: FC<Props> = (props) => {
  const { toggle, ...rest } = props

  return (
    <StyledModal {...rest}>
      <Header>
        <Title>Congratulation!</Title>
      </Header>
    </StyledModal>
  )
}

export default memo(CreatedTokenModal)
