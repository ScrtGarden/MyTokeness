import styled from 'styled-components'

const Container = styled.div`
  padding: ${(props) => props.theme.space.md};
`

const Title = styled.h3`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: min(1.2vw, ${(props) => props.theme.font.sizes.lg});
  font-weight: ${(props) => props.theme.font.weights.semibold};
  line-height: min(1.8vw, ${(props) => props.theme.font.lineHeights.lg});
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Rarity = styled.p`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: min(0.9vw, ${(props) => props.theme.font.sizes.md});
  margin-bottom: 0;
  margin-top: ${(props) => props.theme.space.xxs};
`

export { Container, Title, Rarity }
