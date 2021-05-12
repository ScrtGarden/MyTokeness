import { FC, MouseEvent, memo } from 'react'

import { ButtonProps } from '../../UI/Buttons'
import { Button } from '../../UI/Buttons'
import { StyledDots } from './styles'

type OwnProps = {
  text?: string
  loading?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

type Props = ButtonProps & OwnProps

const ButtonWithLoading: FC<Props> = (props) => {
  const { loading, text = 'Add text', disabled, ...rest } = props

  return (
    <Button {...rest} disabled={loading || disabled}>
      {loading ? <StyledDots /> : text}
    </Button>
  )
}

export default memo(ButtonWithLoading)
