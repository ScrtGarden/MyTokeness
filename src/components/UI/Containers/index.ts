import styled from 'styled-components'

interface ContentProps {
  readonly single?: boolean
}

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

const Content = styled.div<ContentProps>`
  column-gap: ${(props) => props.theme.space.lg};
  display: flex;
  justify-content: center;
  width: 100%;

  ${(props) =>
    props.single &&
    `
      align-items: center;
      flex-direction: column;
      flex-direction: column;
      row-gap: ${props.theme.space.lg};
  `}
`

export { Container, InnerContainer, Content }
