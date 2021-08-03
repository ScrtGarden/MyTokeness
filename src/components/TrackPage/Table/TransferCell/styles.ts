import styled from 'styled-components'

import Icon from '../../../Icons'

interface IconProps {
  readonly deposit?: 'true' | 'false'
}

interface AmountProps {
  readonly deposit: 'true' | 'false'
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Wrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
  flex-direction: row;
`

const StyledIcon = styled(Icon)<IconProps>`
  fill: ${(props) => props.theme.icon.colors.secondary};
`

const Label = styled.p`
  font-size: ${(props) => props.theme.font.sizes.md};
  margin: 0;
`

const Amount = styled.p<AmountProps>`
  color: ${(props) =>
    props.theme.palette[props.deposit === 'true' ? 'green' : 'red'][400]};
  margin: 0;
`

export { Container, StyledIcon, Label, Wrapper, Amount }
