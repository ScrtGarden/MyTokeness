import styled from 'styled-components'

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

export { InputButtonsWrapper, Buttons }
