import styled from 'styled-components'

interface RootProps {
  readonly checked?: boolean
}

const Group = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.sm};
`

const Container = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  display: flex;
  flex-direction: row;
  width: fit-content;
`

const Root = styled.div<RootProps>`
  cursor: pointer;
  width: 16px;
  height: 16px;
  position: relative;

  &::before {
    content: '';
    border-radius: 100%;
    border: 1px solid
      ${(props) =>
        props.checked
          ? props.theme.forms.radio.border.checked.default
          : props.theme.forms.radio.border.unchecked.default};
    background: ${(props) => props.theme.forms.radio.bg.unchecked.default};
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    box-sizing: border-box;
    pointer-events: none;
    z-index: 0;
  }
`

const Fill = styled.div`
  background: ${(props) => props.theme.forms.radio.bg.checked.default};
  width: 0;
  height: 0;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease-in, height 0.2s ease-in;
  pointer-events: none;
  z-index: 1;

  /* &::before {
    content: '';
    opacity: 0;
    width: calc(20px - 4px);
    position: absolute;
    height: calc(20px - 4px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid
      ${(props) => props.theme.forms.radio.border.checked.default};
    border-radius: 100%;
  } */
`

const Input = styled.input`
  opacity: 0;
  z-index: 2;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:checked {
    & ~ ${Fill} {
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      transition: width 0.2s ease-out, height 0.2s ease-out;

      &::before {
        opacity: 1;
        transition: opacity 1s ease;
      }
    }
  }
`

export { Root, Fill, Input, Container, Group }
