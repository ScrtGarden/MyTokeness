import styled from 'styled-components'

const Container = styled.div``

const List = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: grid;
  grid-template-columns: 1fr;
  margin-top: ${(props) => props.theme.space.sm};
  row-gap: ${(props) => props.theme.space.md};
`

export { Container, List }
