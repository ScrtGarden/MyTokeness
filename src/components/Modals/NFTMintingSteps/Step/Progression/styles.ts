import Lottie from 'react-lottie-player'
import styled from 'styled-components'

interface NumberProps {
  readonly disabled?: boolean
}

const Container = styled.div``

const NumberWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  justify-content: center;
  width: 50px;
`

const Number = styled.div<NumberProps>`
  align-items: center;
  border: ${(props) =>
    props.disabled
      ? props.theme.step.progression.number.border.disabled
      : props.theme.step.progression.number.border.default};
  color: ${(props) =>
    props.disabled
      ? props.theme.step.progression.number.color.disabled
      : props.theme.step.progression.number.color.default};
  font-size: ${(props) => props.theme.font.sizes.lg};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  display: flex;
  border-radius: 50%;
  height: 40px;
  justify-content: center;
  width: 40px;
`

const StyledLottie = styled(Lottie)`
  height: 5rem;
  width: 5rem;
`

export { Container, NumberWrapper, Number, StyledLottie }
