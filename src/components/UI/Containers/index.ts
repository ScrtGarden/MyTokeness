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

const Content = styled.div`
  column-gap: ${(props) => props.theme.space.lg};
  display: flex;
  justify-content: center;
  width: 100%;
`

export { Container, InnerContainer, Content }
