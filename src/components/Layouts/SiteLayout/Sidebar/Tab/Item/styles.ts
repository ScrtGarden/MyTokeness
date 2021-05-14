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
    background-color: ${(props) => props.theme.sidebar.tab.indicator};
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
  color: ${(props) => props.theme.sidebar.tab.color};
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.sidebar.tab.color};
  height: 1.8rem;
  width: 1.8rem;
`

export { Container, Label, StyledIcon }
