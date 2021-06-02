import { FC, memo } from 'react'

import ButtonWithLoading from '../Common/ButtonWithLoading'
import { Container, StyledIcon, StyledText } from './styles'

type Props = {
  text?: string
  icon?: string
  className?: string
  buttonText?: string
  loading?: boolean
  onClick?: () => void
}

const EmptyList: FC<Props> = ({
  text,
  icon,
  className,
  buttonText = '',
  loading,
  onClick = () => null,
}) => (
  <Container className={className}>
    <StyledIcon name={icon} />
    <StyledText>{text}</StyledText>
    {buttonText && (
      <ButtonWithLoading
        loading={loading}
        text={buttonText}
        onClick={onClick}
        isPrimary
      />
    )}
  </Container>
)

export default memo(EmptyList)
