import styled from 'styled-components'

const Container = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  flex-direction: row;
  width: 100%;
`

export { Container }
