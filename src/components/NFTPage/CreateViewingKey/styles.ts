import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  bottom: ${(props) => props.theme.space.lg};
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  position: absolute;
  right: ${(props) => props.theme.space.lg};
`

export { Container }
