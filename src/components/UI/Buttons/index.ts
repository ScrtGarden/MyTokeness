import styled from 'styled-components'

interface ButtonProps {
  readonly size?: 'small' | 'medium' | 'large'
  readonly isStretched?: boolean
  readonly isPrimary?: boolean
  readonly isSecondary?: boolean
  readonly isDanger?: boolean
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
  transition: background-color 0.3s ease;
  ${(props) => props.isStretched && 'width: 100%'};

  :hover {
    background-color: ${(props) => props.theme.buttons.button.bg.default.hover};
  }

  :active {
    background-color: ${(props) =>
      props.theme.buttons.button.bg.default.active};
  }
`

export { Button }
