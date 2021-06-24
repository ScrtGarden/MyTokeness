import styled from 'styled-components'

import Icon from '../../../Icons'

interface IconProps {
  readonly fill?: string
}

interface ItemProps {
  readonly color?: string
}

const Container = styled.div``

const Title = styled.h1`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.xl};
  margin: 0;
`

const Rarity = styled.p`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.md};
  margin-bottom: 0;
  margin-top: ${(props) => props.theme.space.xs};
`

const Categories = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: ${(props) => props.theme.space.md};
  row-gap: ${(props) => props.theme.space.md};
  margin-top: ${(props) => props.theme.space.sm};
`

const Item = styled.div.attrs<ItemProps>(({ color }) => ({
  style: {
    color,
  },
}))`
  align-items: center;
  color: ${(props) => props.theme.font.colors.primary};
  column-gap: ${(props) => props.theme.space.xs};
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  display: flex;
  flex-direction: row;
`

const StyledIcon = styled(Icon).attrs<IconProps>(({ fill }) => ({
  style: {
    fill,
  },
}))``

export { Container, Title, Rarity, Categories, Item, StyledIcon }
