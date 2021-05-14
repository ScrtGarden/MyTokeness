import styled from 'styled-components'

import Dots from '../../UI/Loaders/Dots'

const Symbol = styled.div`
  align-items: center;
  background-color: #776344;
  border: 1px solid #776344;
  border-radius: 4px;
  color: ${(props) => props.theme.font.colors.primary};
  display: flex;
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  height: 40px;
  justify-content: center;
  padding: 0 ${(props) => props.theme.space.sm};
  position: relative;
  min-width: 40px;
`

const StyledDots = styled(Dots)`
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

export { Symbol, StyledDots }
