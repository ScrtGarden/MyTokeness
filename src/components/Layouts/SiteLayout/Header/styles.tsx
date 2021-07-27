import styled from 'styled-components'

import { Anchor } from '../../../UI/Buttons'

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
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  cursor: pointer;
  display: flex;
  flex-direction: row;
`

const Name = styled.div`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.lg};
  font-weight: ${(props) => props.theme.font.weights.bold};
`

const Wrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  flex-direction: row;
`

const StyledAchor = styled(Anchor)`
  color: #fff;
  font-size: ${(props) => props.theme.font.sizes.md};
`

export { Container, Brand, Name, Wrapper, StyledAchor }
