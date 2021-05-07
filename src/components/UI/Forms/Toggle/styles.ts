import styled from 'styled-components'

const CheckBoxWrapper = styled.div`
  position: relative;
`

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 19px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.forms.toggle.bg.unchecked.default};
  cursor: pointer;
  transition: background-color 0.3s ease;

  :hover {
    background-color: ${(props) => props.theme.forms.toggle.bg.unchecked.hover};
  }

  :active {
    background-color: ${(props) =>
      props.theme.forms.toggle.bg.unchecked.active};
  }

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 40px;
  height: 20px;
  transition: background-color 0.3s ease;

  &:checked + ${CheckBoxLabel} {
    background: ${(props) => props.theme.forms.toggle.bg.checked.default};

    :hover {
      background-color: ${(props) => props.theme.forms.toggle.bg.checked.hover};
    }

    :active {
      background-color: ${(props) =>
        props.theme.forms.toggle.bg.checked.active};
    }

    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin-left: 25px;
      transition: 0.2s;
    }
  }
`

export { CheckBoxWrapper, CheckBoxLabel, CheckBox }
