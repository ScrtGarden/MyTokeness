import { FC, InputHTMLAttributes, memo } from 'react'

import { Input, InputProps } from '../../UI/Forms'
import { Container, StyledDots } from './styles'

type OwnProps = {
  loading?: boolean
}

type Props = InputProps & OwnProps & InputHTMLAttributes<HTMLInputElement>

const InputWithLoading: FC<Props> = ({ loading, children, ...rest }) => (
  <Container>
    <Input {...rest} />
    {loading && <StyledDots color="white" />}
  </Container>
)

export default memo(InputWithLoading)
