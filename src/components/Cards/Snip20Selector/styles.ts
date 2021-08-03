import styled from 'styled-components'

import { Hint } from '../../UI/Forms'

const StyledHint = styled(Hint)`
  cursor: pointer;
  transition: color 0.3s ease;

  :hover {
    color: #fff;
  }
`

export { StyledHint }
