import styled from 'styled-components'

import Dots from '../../UI/Loaders/Dots'

const Container = styled.div`
  position: relative;
`

const StyledDots = styled(Dots)`
  bottom: 0;
  background-image: linear-gradient(to right, #0e111580, #0e1115);
  border-top-right-radius: ${(props) => props.theme.forms.input.border.radius};
  border-bottom-right-radius: ${(props) =>
    props.theme.forms.input.border.radius};
  margin: auto 0;
  position: absolute;
  right: 1px;
  top: 10px;
  width: 38px;
  height: 38px;
`

export { Container, StyledDots }
