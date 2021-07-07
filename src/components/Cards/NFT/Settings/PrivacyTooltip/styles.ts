import styled from 'styled-components'

const Container = styled.div``

const Expiration = styled.div`
  font-size: ${(props) => props.theme.font.sizes.sm};
  margin-top: ${(props) => props.theme.space.xxs};
`

export { Container, Expiration }
