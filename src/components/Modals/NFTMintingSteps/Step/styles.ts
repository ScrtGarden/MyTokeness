import styled from 'styled-components'

import { Button } from '../../../UI/Buttons'

interface LabelProps {
  readonly disabled?: boolean
}

const Container = styled.div`
  flex: 1;
  width: 100%;
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Description = styled.div`
  margin-left: 2rem;
`

const Label = styled.h2<LabelProps>`
  color: ${(props) =>
    props.disabled
      ? props.theme.font.colors.disabled
      : props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.lg};
  margin: 0;
`

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.space.md};
`

export { Container, Description, Label, Wrapper, StyledButton }
