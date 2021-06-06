import styled from 'styled-components'

const Container = styled.div``

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.space.md};
  row-gap: ${(props) => props.theme.space.md};
`

export { Container, Content }
