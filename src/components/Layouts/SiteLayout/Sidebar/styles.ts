import styled from 'styled-components'

const Container = styled.div`
  align-self: flex-start;
  background-color: ${(props) => props.theme.fg};
  position: sticky;
  top: 62px;
  height: calc(100vh - 62px);
`

export { Container }
