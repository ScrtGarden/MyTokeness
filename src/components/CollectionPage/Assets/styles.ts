import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid red;
  color: #fff;
`

const ScrollWrapper = styled.div`
  width: 100%;

  .scroll {
    gap: ${(props) => props.theme.space.md};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`

export { Container, ScrollWrapper }
