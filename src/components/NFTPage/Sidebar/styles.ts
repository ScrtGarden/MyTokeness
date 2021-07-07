import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${(props) => props.theme.space.lg};
  position: relative;
  row-gap: ${(props) => props.theme.space.lg};
  width: 100%;

  ::before {
    background: ${(props) => props.theme.palette.green[400]};
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 4px;
  }
`

export { Container }
