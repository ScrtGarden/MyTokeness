import styled from 'styled-components'

const Brand = styled.h1`
  color: ${(props) => props.theme.font.colors.brand};
  font-size: 4.5rem;
  margin: 0;
  margin-bottom: ${(props) => props.theme.space.md};

  span {
    color: ${(props) => props.theme.font.colors.primary};
  }
`

const Title = styled.h2`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: 2.5rem;
  font-weight: ${(props) => props.theme.font.weights.semibold};
  margin-bottom: ${(props) => props.theme.space.sm};
  margin-top: 0;
`

export { Brand, Title }
