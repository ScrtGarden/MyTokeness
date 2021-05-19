import styled from 'styled-components'

const AddBar = styled.div``

const Field = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.xs};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SkeletonWrapper = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.font.sizes.md};
`

export { AddBar, Field, SkeletonWrapper }
