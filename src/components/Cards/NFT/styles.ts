import styled from 'styled-components'

const Container = styled.div`
  aspect-ratio: 0.9;
  border: 2px solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radii.md};
  background: ${(props) => props.theme.fg};
  overflow: hidden;
`

const ImageWrapper = styled.div`
  border: 1px solid white;
  aspect-ratio: 1.3;
  position: relative;
  width: 100%;
`

export { Container, ImageWrapper }
