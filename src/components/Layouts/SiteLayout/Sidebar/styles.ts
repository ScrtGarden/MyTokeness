import styled from 'styled-components'

const Container = styled.div`
  align-self: flex-start;
  background-color: ${(props) => props.theme.fg};
  border-right: 2px solid ${(props) => props.theme.border.color};
  position: sticky;
  top: 62px;
  height: calc(100vh - 62px);
  padding: ${(props) => props.theme.space.sm} 0;
`

export { Container }
