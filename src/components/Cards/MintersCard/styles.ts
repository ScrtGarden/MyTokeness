import styled from 'styled-components'

const AddBar = styled.div``

const Field = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.xs};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export { AddBar, Field }
