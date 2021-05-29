import { FC, memo, useMemo } from 'react'

import { Hint } from '../../../UI/Forms'
import Progression from './Progression'
import { Container, Description, Label, StyledButton, Wrapper } from './styles'
import { StatusOption } from '..'

type Props = {
  stepNumber: number
  label: string
  hint?: string
  status: StatusOption
  onClick?: () => void
}

const Step: FC<Props> = (props) => {
  const { stepNumber, label, hint, status, onClick } = props

  const isDisabled = useMemo(
    () => status === 'completed' || status === 'awaiting',
    [status]
  )

  return (
    <Container>
      <Wrapper>
        <Progression
          status={status}
          stepNumber={stepNumber}
          disabled={isDisabled}
        />
        <Description>
          <Label disabled={isDisabled}>{label}</Label>
          {hint && <Hint disabled={isDisabled}>{hint}</Hint>}
        </Description>
      </Wrapper>
      {status === 'failed' && (
        <StyledButton isStretched isPrimary onClick={onClick}>
          Try Again
        </StyledButton>
      )}
    </Container>
  )
}

export default memo(Step)
