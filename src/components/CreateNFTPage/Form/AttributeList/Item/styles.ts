import styled from 'styled-components'

const Container = styled.div``

const Wrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  flex-direction: row;
`

export { Container, Wrapper }
