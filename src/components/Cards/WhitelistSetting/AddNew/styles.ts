import styled from 'styled-components'

const Container = styled.div`
  margin-top: ${(props) => props.theme.space.md};
`

const Content = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  flex-direction: row;
  margin: ${(props) => props.theme.space.md} 0;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: ${(props) => props.theme.space.md};
`

const ExpirationWrapper = styled.div`
  flex: 1;
`

export { Container, Content, Details, ExpirationWrapper }
