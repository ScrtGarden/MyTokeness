import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
`

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.space.md};
  row-gap: ${(props) => props.theme.space.xl};
`

export { Container, Steps }
