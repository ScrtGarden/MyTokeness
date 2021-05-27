import styled from 'styled-components'

interface TabProps {
  readonly selected?: boolean
  readonly disabled?: boolean
}

const Container = styled.div`
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.border.color};
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  flex-direction: row;
  padding: 0 ${(props) => props.theme.space.sm};
`

const Tab = styled.div<TabProps>`
  color: ${(props) => props.theme.font.colors.secondary}90;
  cursor: pointer;
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  padding: ${(props) => props.theme.space.sm} 0;
  position: relative;
  transition: color 0.3s ease;
  ${(props) => props.selected && `color: ${props.theme.palette.yellow[600]}`};

  :hover {
    color: ${(props) => props.theme.palette.yellow[600]};
  }

  ::after {
    display: ${(props) => (props.selected ? 'block' : 'none')};
    border-bottom: 2px solid ${(props) => props.theme.palette.yellow[600]};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    width: 100%;
  }

  ${(props) =>
    props.disabled &&
    `
    color: ${props.theme.font.colors.disabled};
    pointer-events: none;
  `};
`

export { Container, Tab }
