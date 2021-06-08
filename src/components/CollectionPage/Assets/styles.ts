import styled from 'styled-components'

import EmptyList from '../../EmptyList'

const ScrollWrapper = styled.div`
  width: 100%;

  .scroll {
    gap: ${(props) => props.theme.space.md};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`

const Placeholder = styled.div`
  aspect-ratio: 0.9;
  border: 2px solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radii.md};
  background: ${(props) => props.theme.fg};
`

const StyledEmptyList = styled(EmptyList)`
  width: 100%;
`

export { ScrollWrapper, Placeholder, StyledEmptyList }
