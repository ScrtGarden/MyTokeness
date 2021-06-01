import styled from 'styled-components'

import { Card } from '../../UI/Card'

const StyledCard = styled(Card)`
  max-width: none;
  width: 100%;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
`

const InputButtonsWrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  flex-direction: row;
`

const Buttons = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export { StyledCard, InputButtonsWrapper, Actions, Buttons }
