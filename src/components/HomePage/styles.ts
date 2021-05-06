import styled from 'styled-components'

const Brand = styled.h1`
  color: ${(props) => props.theme.font.colors.brand};
  font-size: 4rem;
  margin: 0;
  margin-bottom: ${(props) => props.theme.space.md};
`

export { Brand }
