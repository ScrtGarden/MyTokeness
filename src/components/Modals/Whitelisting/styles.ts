import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.md};
`

export { Wrapper }
