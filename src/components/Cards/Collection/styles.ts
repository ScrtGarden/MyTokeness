import styled from 'styled-components'

import Icon from '../../Icons'
import { IconButton } from '../../UI/Buttons'
import { Skeleton } from '../../UI/Loaders'
import { Tag } from '../../UI/Tags'

const Container = styled.div`
  align-items: center;
  aspect-ratio: 1.4;
  background: ${(props) => props.theme.fg};
  border: 2px solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radii.md};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) => props.theme.space.lg};
  position: relative;
  width: 100%;
`

const Label = styled.div`
  color: ${(props) => props.theme.font.colors.primary};
  display: -webkit-box;
  font-size: min(1.3vw, ${(props) => props.theme.font.sizes.lg});
  font-weight: ${(props) => props.theme.font.weights.semibold};
  margin: 0;
  overflow: hidden;
  line-height: min(1.8vw, ${(props) => props.theme.font.lineHeights.lg});
  text-align: center;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.icon.colors.secondary};
  height: 6rem;
  margin-top: ${(props) => props.theme.space.md};
  width: 6rem;
`

const SkeletonLabel = styled(Skeleton)`
  flex: unset;
`

const SkeletonIcon = styled(Skeleton)`
  border-radius: 50%;
  flex: unset;
  margin-top: ${(props) => props.theme.space.md};
`

const StyledTag = styled(Tag)`
  bottom: 20px;
  position: absolute;
  right: 20px;
`

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 1;
`

export {
  Container,
  Label,
  StyledIcon,
  SkeletonLabel,
  SkeletonIcon,
  StyledTag,
  StyledIconButton,
}
