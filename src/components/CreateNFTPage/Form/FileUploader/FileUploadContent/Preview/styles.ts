import styled from 'styled-components'

const Container = styled.div`
  padding: ${(props) => props.theme.space.sm};
  position: relative;
  width: 100%;
`

const Image = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`

export { Container, Image }
