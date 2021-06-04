import styled from 'styled-components'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.theme.space.md} 0;
  row-gap: ${(props) => props.theme.space.md};
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export { Content, ButtonWrapper }
