import styled from 'styled-components'

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
  z-index: 100;
`

const Brand = styled.div`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.lg};
  font-weight: ${(props) => props.theme.font.weights.bold};
`

export { Container, Brand }
