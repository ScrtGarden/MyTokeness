import styled from 'styled-components'

const Title = styled.h2`
  margin: 0;
`

const Attributes = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  margin-top: ${(props) => props.theme.space.md};
  row-gap: ${(props) => props.theme.space.xs};
`

export { Title, Attributes }
