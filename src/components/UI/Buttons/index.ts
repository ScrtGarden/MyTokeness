import styled from 'styled-components'

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
  color: ${(props) => props.theme.buttons.button.color};
  cursor: pointer;
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  height: 30px;
  outline: none;
  padding: 0 ${(props) => props.theme.space.sm};
  position: relative;
  transition: background-color 0.3s ease;
  ${(props) => props.width && `width: ${props.width}px`};
  ${(props) => props.isStretched && 'width: 100%'};

  :hover {
    background-color: ${(props) => props.theme.buttons.button.bg.default.hover};
  }

  :active {
    background-color: ${(props) =>
      props.theme.buttons.button.bg.default.active};
  }

  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      background-color: ${props.theme.buttons.button.bg.disabled};
  `}
`

export { Button }
