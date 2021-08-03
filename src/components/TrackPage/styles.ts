import styled from 'styled-components'

import EmptyList from '../EmptyList'

const Container = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.md};
`

const StyledEmptyList = styled(EmptyList)`
  width: 100%;
`

export { Container, StyledEmptyList }
