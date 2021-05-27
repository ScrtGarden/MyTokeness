import styled from 'styled-components'

import Icon from '../../Icons'

const Container = styled.div`
  align-items: center;
  align-self: flex-start;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.space.md};
  width: fit-content;
`

const Label = styled.div`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.bold};
  text-transform: uppercase;
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.icon.colors.primary};
  height: 1.4em;
  margin-right: ${(props) => props.theme.space.xs};
  width: 1.4rem;
`

export { Container, Label, StyledIcon }
