import styled from 'styled-components'

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.xl};
  width: 100%;
`

export { Content }
