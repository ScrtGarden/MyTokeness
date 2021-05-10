import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  display: flex;
  column-gap: ${(props) => props.theme.space.sm};
  margin-top: ${(props) => props.theme.space.md};
`

const Position = styled.div`
  align-items: center;
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  display: flex;
  justify-content: center;
  width: 30px;
`

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.sm};
`

export { Container, Wrapper, Position }
