import styled from 'styled-components'

interface TabProps {
  readonly selected?: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-width: 250px;
  row-gap: ${(props) => props.theme.space.sm};
  width: 30%;
  position: sticky;
  top: 75px;
`

const Tab = styled.div<TabProps>`
  color: ${(props) => props.theme.font.colors.secondary};
  cursor: pointer;
  font-size: ${(props) => props.theme.font.sizes.md};
  padding: ${(props) => props.theme.space.sm} 0;
  transition: color 0.3s ease;

  :hover {
    color: ${(props) => props.theme.font.colors.primary};
  }

  ${(props) =>
    props.selected &&
    `
    color: ${props.theme.font.colors.primary};
    font-weight: ${props.theme.font.weights.semibold};
  `}
`

export { Container, Tab }
