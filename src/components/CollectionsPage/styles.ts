import styled from 'styled-components'

const Grid = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fit, 250px);
  overflow: hidden;
  row-gap: ${(props) => props.theme.space.md};
  width: 100%;
`

export { Grid }
