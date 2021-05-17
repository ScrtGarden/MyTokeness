import styled from 'styled-components'

import Icon from '../../Icons'

export interface ButtonProps {
  readonly size?: 'small' | 'medium' | 'large'
  readonly isStretched?: boolean
  readonly isPrimary?: boolean
  readonly isSecondary?: boolean
  readonly isDanger?: boolean
  readonly width?: number
  readonly disabled?: boolean
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.theme.buttons.button.bg.default.base};
  border: none;
  border-radius: 500px;
  color: ${(props) => props.theme.buttons.button.color.default.base};
  cursor: pointer;
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  height: 30px;
  outline: none;
  padding: 0 ${(props) => props.theme.space.sm};
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease;
  ${(props) => props.width && `width: ${props.width}px`};
  ${(props) => props.isStretched && 'width: 100%'};

  ${(props) =>
    props.isPrimary &&
    `
    background-color: ${props.theme.buttons.button.bg.primary.base};
    color: ${props.theme.buttons.button.color.primary};
  `}

  :hover {
    background-color: ${(props) => props.theme.buttons.button.bg.default.hover};
    color: ${(props) => props.theme.buttons.button.color.default.hover};

    ${(props) =>
      props.isPrimary &&
      `
        background-color: ${props.theme.buttons.button.bg.primary.hover};
        color: ${props.theme.buttons.button.color.primary};
      `}
  }

  :active {
    background-color: ${(props) =>
      props.theme.buttons.button.bg.default.active};
    color: ${(props) => props.theme.buttons.button.color.default.active};

    ${(props) =>
      props.isPrimary &&
      `
        background-color: ${props.theme.buttons.button.bg.primary.active};
        color: ${props.theme.buttons.button.color.primary};
      `}
  }

  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      background-color: ${props.theme.buttons.button.bg.disabled};
      color: ${props.theme.buttons.button.color.disabled};
  `}
`

const IconButton = styled.button`
  background-color: ${(props) => props.theme.buttons.button.bg.default.base};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 40px;
  flex-shrink: 0;
  font-size: 0px;
  overflow: hidden;
  padding: 0px;
  text-decoration: none;
  transition: background-color 0.25s ease-in-out 0s;
  width: 40px;

  :hover {
    background-color: ${(props) => props.theme.buttons.button.bg.default.hover};
  }

  :active {
    background-color: ${(props) =>
      props.theme.buttons.button.bg.default.active};
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.icon.colors.secondary};
  height: 16px;
  width: 16px;
`

export { Button, IconButton, StyledIcon }
