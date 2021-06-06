import styled from 'styled-components'

import EmptyList from '../../../EmptyList'
import { Table } from '../../../UI/Table'

const Container = styled.div`
  background-color: ${(props) => props.theme.bg};
  border-radius: ${(props) => props.theme.border.radii.sm};
  margin-top: ${(props) => props.theme.space.md};
  overflow: hidden;
`

const Placeholder = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.bg};
  border-radius: ${(props) => props.theme.border.radii.sm};
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.space.md};
  height: 300px;
`

const StyledEmptyList = styled(EmptyList)`
  flex: 1;
`

const StyledTable = styled(Table)`
  table-layout: auto;
`

export { Container, Placeholder, StyledEmptyList, StyledTable }
