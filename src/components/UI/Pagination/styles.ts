import styled from 'styled-components'

interface ButtonProps {
  readonly selected?: boolean
  readonly disabled?: boolean
  readonly hide?: boolean
}

const Container = styled.div`
  column-gap: ${(props) => props.theme.space.xxs};
  display: flex;
`

const Button = styled.button<ButtonProps>`
  background: none;
  border: none;
  border-radius: 4px;
  color: ${(props) => props.theme.font.colors.secondary};
  cursor: pointer;
  font-size: ${(props) => props.theme.font.sizes.md};
  height: 32px;
  transition: color 0.25s ease-in-out, background 0.2s ease;
  width: 32px;

  :hover {
    background: ${(props) => props.theme.pagination.button.bg.selected};

    ${(props) =>
      props.selected &&
      `
      background: ${props.theme.pagination.button.bg.hover};
    `};
  }

  :active {
    background: ${(props) => props.theme.pagination.button.bg.active};
  }

  ${(props) =>
    props.selected &&
    `
    background: ${props.theme.pagination.button.bg.selected};
    color: ${props.theme.font.colors.primary};
    font-weight: ${props.theme.font.weights.semibold};
  `}

  ${(props) => (props.disabled || props.hide) && 'pointer-events: none'};
  ${(props) => props.hide && 'opacity: 0'};

  svg {
    fill: #fff;
  }
`

export { Container, Button }
