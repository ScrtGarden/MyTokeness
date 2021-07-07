import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) => props.theme.space.lg};
  position: relative;
`

const Title = styled.div`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.xl};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  position: absolute;
  top: 20px;
`

export { Container, Title }
