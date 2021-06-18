import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.sm};
`

const Attributes = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.sm};
`

export { Container, Attributes }
