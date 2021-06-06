import styled from 'styled-components'

const Options = styled.div`
  column-gap: ${(props) => props.theme.space.lg};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  row-gap: ${(props) => props.theme.space.md};
`

export { Options }
