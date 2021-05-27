import styled from 'styled-components'

import Icon from '../../../../../Icons'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) => props.theme.space.lg};
  width: 100%;
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.icon.colors.secondary};
  height: ${(props) => props.theme.icon.sizes.xxl};
  margin-bottom: ${(props) => props.theme.space.md};
  width: ${(props) => props.theme.icon.sizes.xxl};
`

const Text = styled.p`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  margin: 0;
`

export { Container, StyledIcon, Text }
