import styled from 'styled-components'

interface ContainerProps {
  readonly flexend?: boolean
}

const Container = styled.div<ContainerProps>`
  ${(props) => props.flexend && 'align-items: flex-end'};
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.md};
  width: 100%;
`

export { Container }
