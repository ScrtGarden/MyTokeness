import styled from 'styled-components'

interface ItemProps {
  readonly isDanger?: boolean
}

const Container = styled.div`
  background: ${(props) => props.theme.fg};
  border: 2px solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radii.sm};
  overflow: hidden;
`

const Item = styled.div<ItemProps>`
  color: ${(props) => props.theme.font.colors.primary};
  cursor: pointer;
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  padding: ${(props) => `${props.theme.space.sm} ${props.theme.space.md}`};

  ${(props) =>
    props.isDanger &&
    `
    color: ${props.theme.font.colors.warn};
  `}

  :hover {
    background: ${(props) => props.theme.bg};
  }
`

export { Container, Item }
