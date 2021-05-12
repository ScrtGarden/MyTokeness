import styled from 'styled-components'

import Icon from '../../../Icons'

const Container = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.fg};
  border-bottom: 2px solid ${(props) => props.theme.border.color};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 62px;
  padding: 0 ${(props) => props.theme.space.md};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`

const Brand = styled.div`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.lg};
  font-weight: ${(props) => props.theme.font.weights.bold};
`

const Circle = styled.div`
  align-items: center;
  border: 2px solid #f0be72;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 3.8rem;
  justify-content: center;
  width: 3.8rem;
`

const StyledIcon = styled(Icon)`
  fill: #f0be72;
  height: 50%;
  width: 50%;
`

export { Container, Brand, StyledIcon, Circle }
