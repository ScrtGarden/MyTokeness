import { FC, memo } from 'react'

import SuccessTick from '../../../../../../public/lotties/success-tick.json'
import Spinner from '../../../../UI/Loaders/Spinner'
import { StatusOption } from '../..'
import { Container, Number, NumberWrapper, StyledLottie } from './styles'

type Props = {
  status: StatusOption
  stepNumber: number
  disabled?: boolean
}

const Progression: FC<Props> = (props) => {
  const { status, stepNumber, disabled } = props
  return (
    <Container>
      {status === 'in-progress' && <Spinner />}
      {(status === 'awaiting' || status === 'failed') && (
        <NumberWrapper>
          <Number disabled={disabled}>{stepNumber}</Number>
        </NumberWrapper>
      )}
      {status === 'completed' && (
        <StyledLottie loop={false} play animationData={SuccessTick} />
      )}
    </Container>
  )
}

export default memo(Progression)
