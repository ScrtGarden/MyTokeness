import { a } from 'react-spring'
import styled from 'styled-components'

import Icon from '../../../../Icons'

interface HeaderProps {
  readonly clickable?: boolean
  readonly selected?: boolean
}

interface IconProps {
  readonly small?: string
}

const Container = styled(a.div)`
  overflow: hidden;
`

const Header = styled.div<HeaderProps>`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-direction: row;
  padding: ${(props) => props.theme.space.md};
  position: relative;
  transition: background 0.3s ease;

  ::before {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #33ced8;
    content: '';
    ${(props) => !props.selected && `display: none`};
    position: absolute;
    height: 90%;
    left: 0;
    width: 4px;
  }

  :hover {
    background: ${(props) => props.theme.sidebar.tab.bg.hover};
  }
`

const Wrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  display: flex;
  flex-direction: row;
`

const Label = styled.div`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
`

const StyledIcon = styled(Icon)<IconProps>`
  fill: ${(props) => props.theme.icon.colors.primary};
  height: ${(props) => (props.small === 'true' ? '1.5rem' : '2rem')};
  width: ${(props) => (props.small === 'true' ? '1.5rem' : '2rem')};
`

const Menu = styled(a.div)`
  background: ${(props) => props.theme.bg};
  display: flex;
  flex-direction: column;
`

const Item = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

export { Container, Header, Label, StyledIcon, Wrapper, Menu, Item }
