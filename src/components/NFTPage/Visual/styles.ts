import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 600px;
  justify-content: center;
  max-width: 600px;
  position: relative;
  width: 90%;
`

const DecryptText = styled.div`
  color: ${(props) => props.theme.palette.blue[700]};
  font-size: ${(props) => props.theme.font.sizes.lg};
  font-weight: ${(props) => props.theme.font.weights};
  width: fit-content;
`

export { Container, DecryptText }
