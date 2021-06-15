import styled from 'styled-components'

import Icon from '../../../Icons'

interface IconProps {
  readonly disabled?: boolean
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.space.sm};
  width: 100%;
`

const StyledIcon = styled(Icon)<IconProps>`
  fill: ${(props) =>
    props.disabled
      ? `${props.theme.palette.yellow[600]}60`
      : props.theme.palette.yellow[600]};
`

const Section = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  display: flex;
  flex-direction: row;
`

export { Container, StyledIcon, Section }
