import styled from 'styled-components'

const Container = styled.div`
  padding: ${(props) => props.theme.space.lg};
`

const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
`

export { Container, InnerContainer }
