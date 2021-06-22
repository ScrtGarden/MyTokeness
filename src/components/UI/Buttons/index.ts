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
  border: ${(props) => props.theme.buttons.button.border.default};
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
    border: ${props.theme.buttons.button.border.primary};
    color: ${props.theme.buttons.button.color.primary};
  `}

  ${(props) =>
    props.isDanger &&
    `
    background-color: ${props.theme.buttons.button.bg.danger.base};
    border: ${props.theme.buttons.button.border.danger};
    color: ${props.theme.buttons.button.color.danger};
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

    ${(props) =>
      props.isDanger &&
      `
      background-color: ${props.theme.buttons.button.bg.danger.hover};
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

    ${(props) =>
      props.isDanger &&
      `
      background-color: ${props.theme.buttons.button.bg.danger.active};
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

const IconButton = styled.button<ButtonProps>`
  background-color: ${(props) => props.theme.buttons.button.bg.default.base};
  border: ${(props) => props.theme.buttons.button.border.default};
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

  ${(props) =>
    props.size === 'small' &&
    `
    height: 32px;
    width: 32px;
  `}

  ${(props) =>
    props.isDanger &&
    `
    background-color: ${props.theme.buttons.button.bg.danger.base};
  `}

  :hover {
    background-color: ${(props) => props.theme.buttons.button.bg.default.hover};

    ${(props) =>
      props.isDanger &&
      `
      background-color: ${props.theme.buttons.button.bg.danger.hover};
    `}
  }

  :active {
    background-color: ${(props) =>
      props.theme.buttons.button.bg.default.active};

    ${(props) =>
      props.isDanger &&
      `
      background-color: ${props.theme.buttons.button.bg.danger.active};
    `}
  }

  svg {
    ${(props) =>
      props.isDanger &&
      `
      fill: ${props.theme.buttons.button.color.default};
    `}
  }

  ${(props) =>
    props.disabled &&
    `
    pointer-events: none;
  `}
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.icon.colors.secondary};
`

const IconButtonWrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.xxs};
  display: flex;
  flex-direction: row;
`

const Anchor = styled.a`
  color: ${(props) => props.theme.buttons.anchor.color.base};
  cursor: pointer;
  text-decoration: none;
  transition: color 0.25s ease-in-out 0s;

  :hover {
    color: ${(props) => props.theme.buttons.anchor.color.hover};
    text-decoration: underline;
  }

  :active {
    color: ${(props) => props.theme.buttons.anchor.color.active};
    text-decoration: underline;
  }
`

export { Button, IconButton, StyledIcon, IconButtonWrapper, Anchor }
