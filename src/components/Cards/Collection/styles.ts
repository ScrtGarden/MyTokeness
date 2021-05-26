import styled from 'styled-components'

import Icon from '../../Icons'
import { IconButton } from '../../UI/Buttons'
import { Tag } from '../../UI/Tags'

const Container = styled.div`
  align-items: center;
  background: ${(props) => props.theme.fg};
  border: 2px solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radii.md};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) => props.theme.space.lg};
  position: relative;
`

const Label = styled.div`
  color: ${(props) => props.theme.font.colors.primary};
  display: -webkit-box;
  font-size: ${(props) => props.theme.font.sizes.lg};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  margin: 0;
  overflow: hidden;
  line-height: ${(props) => props.theme.font.lineHeights.lg};
  text-align: center;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.icon.colors.secondary};
  height: 6rem;
  margin-top: ${(props) => props.theme.space.lg};
  width: 6rem;
`

const StyledTag = styled(Tag)`
  bottom: 10px;
  position: absolute;
  right: 10px;
`

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 10px;
  top: 10px;
`

export { Container, Label, StyledIcon, StyledTag, StyledIconButton }
