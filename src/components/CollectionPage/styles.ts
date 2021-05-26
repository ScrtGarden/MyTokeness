import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid red;
  margin-top: ${(props) => props.theme.space.lg};
  width: 100%;
`

export { Container }
