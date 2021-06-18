import styled from 'styled-components'

const Container = styled.div`
  border-left: 4px solid ${(props) => props.theme.palette.yellow[600]};
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.space.lg};
  row-gap: ${(props) => props.theme.space.lg};
  width: 100%;
`

export { Container }
