import styled from 'styled-components'

const Container = styled.div`
  align-self: flex-start;
  background-color: ${(props) => props.theme.fg};
  border-right: 2px solid ${(props) => props.theme.border.color};
  height: calc(100vh - 62px);
  overflow: scroll;
  padding: ${(props) => props.theme.space.sm} 0;
  position: sticky;
  top: 62px;
`

const SectionHeader = styled.div`
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.sm};
  font-weight: ${(props) => props.theme.font.weights.bold};
  margin-top: ${(props) => props.theme.space.xs};
  padding: ${(props) => `${props.theme.space.xs} ${props.theme.space.md}`};
`

export { Container, SectionHeader }
