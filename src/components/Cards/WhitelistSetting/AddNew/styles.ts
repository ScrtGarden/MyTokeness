import styled from 'styled-components'

const Container = styled.div`
  margin-top: ${(props) => props.theme.space.md};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.theme.space.md} 0;
  row-gap: ${(props) => props.theme.space.md};
`

const Options = styled.div`
  column-gap: ${(props) => props.theme.space.lg};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  row-gap: ${(props) => props.theme.space.md};
`

export { Container, Content, Options }
