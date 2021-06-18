import styled from 'styled-components'

const Container = styled.div``

const Title = styled.h1`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.xl};
  margin: 0;
`

const Rarity = styled.p`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.md};
  margin-bottom: 0;
  margin-top: ${(props) => props.theme.space.xs};
`

export { Container, Title, Rarity }
