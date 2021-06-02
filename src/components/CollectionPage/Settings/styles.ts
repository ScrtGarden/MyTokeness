import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: #fff;
  padding-top: ${(props) => props.theme.space.sm};
  width: 100%;
`

export { Container }
