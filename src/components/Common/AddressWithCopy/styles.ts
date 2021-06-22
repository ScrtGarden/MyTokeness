import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  display: flex;
  flex-direction: row;
`

const Address = styled.p`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  margin: 0;
`

export { Container, Address }
