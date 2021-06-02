import styled from 'styled-components'

const Container = styled.div`
  padding: ${(props) => props.theme.space.md};
`

const Title = styled.h3`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: 1.2vw;
  font-weight: ${(props) => props.theme.font.weights.semibold};
  line-height: 1.8vw;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Rarity = styled.p`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: 0.9vw;
  margin-bottom: 0;
  margin-top: ${(props) => props.theme.space.xxs};
`

export { Container, Title, Rarity }
