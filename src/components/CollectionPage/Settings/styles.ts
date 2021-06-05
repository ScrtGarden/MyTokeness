import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  row-gap: ${(props) => props.theme.space.lg};
  width: 100%;
`

export { Container }
