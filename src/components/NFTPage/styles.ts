import styled from 'styled-components'

import BackLink from '../Common/BackLink'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
  place-items: center;
  position: relative;
  flex: 1;
`

const StyledBack = styled(BackLink)`
  left: ${(props) => props.theme.space.lg};
  position: absolute;
  top: ${(props) => props.theme.space.lg};
`

export { Container, StyledBack }
