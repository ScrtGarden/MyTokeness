import styled from 'styled-components'

const Content = styled.div`
  padding: ${(props) => props.theme.space.md} 0;
`

const Field = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export { Content, Field }
