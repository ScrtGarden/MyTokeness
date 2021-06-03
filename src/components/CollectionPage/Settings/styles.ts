import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding-top: ${(props) => props.theme.space.sm};
  row-gap: ${(props) => props.theme.space.lg};
  width: 100%;
`

export { Container }
