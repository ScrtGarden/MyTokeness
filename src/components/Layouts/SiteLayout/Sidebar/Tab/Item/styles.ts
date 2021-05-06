import styled from 'styled-components'

import Icon from '../../../../../Icons'

interface ContainerProps {
  readonly selected?: boolean
}

const Container = styled.div<ContainerProps>`
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: ${(props) => props.theme.space.md};
  padding-left: ${(props) => props.theme.space.lg};
  position: relative;
  transition: background 0.3s ease;

  ::before {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    background: linear-gradient(to bottom, #517490, #517490);
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

const Label = styled.div`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.icon.colors.secondary};
  height: 1.8rem;
  width: 1.8rem;
`

export { Container, Label, StyledIcon }
