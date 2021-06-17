import styled from 'styled-components'

interface ContainerProps {
  readonly full?: boolean
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 100%;
  flex: 1;
  position: relative;

  ${(props) =>
    props.full &&
    `
    display: flex;
    
  `}
`

export { Container }
