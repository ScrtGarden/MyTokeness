import styled from 'styled-components'

interface HeaderProps {
  readonly margin?: boolean
}

const Card = styled.div`
  background-color: ${(props) => props.theme.fg};
  border: 2px solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radii.md};
  height: fit-content;
  max-width: 475px;
  padding: ${(props) => props.theme.space.lg};
  width: 90%;
`

const Header = styled.div<HeaderProps>`
  border-bottom: 2px solid ${(props) => props.theme.border.color};
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.md};
  padding-bottom: ${(props) => props.theme.space.sm};
  ${(props) => props.margin && `margin-top: ${props.theme.space.lg}`};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.space.md};
  row-gap: ${(props) => props.theme.space.md};
`

export { Card, Header, Wrapper }
