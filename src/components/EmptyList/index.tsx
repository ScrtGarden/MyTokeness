import { FC, memo } from 'react'

import ButtonWithLoading from '../Common/ButtonWithLoading'
import { IconName } from '../Icons'
import { Container, StyledIcon, StyledText } from './styles'

type Props = {
  text?: string
  icon?: IconName
  className?: string
  buttonText?: string
  buttonWidth?: number
  loading?: boolean
  onClick?: () => void
}

const EmptyList: FC<Props> = ({
  text,
  icon,
  className,
  buttonText = '',
  loading,
  buttonWidth,
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
        width={buttonWidth}
      />
    )}
  </Container>
)

export default memo(EmptyList)
