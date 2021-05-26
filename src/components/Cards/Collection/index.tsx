import { FC, MouseEvent, memo } from 'react'

import { StyledIcon as Icon } from '../../UI/Buttons'
import {
  Container,
  Label,
  StyledIcon,
  StyledIconButton,
  StyledTag,
} from './styles'

type Props = {
  name: string
  icon: string
  onClick: () => void
  draft?: boolean
  onClickRemove?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Collection: FC<Props> = ({
  name,
  icon,
  onClick,
  draft,
  onClickRemove = () => null,
}) => {
  return (
    <Container onClick={onClick}>
      <Label>{name}</Label>
      <StyledIcon name={icon} />
      {draft && <StyledTag color="blue">Draft</StyledTag>}
      {draft && (
        <StyledIconButton onClick={(e) => onClickRemove(e)}>
          <Icon name="trash-duo" />
        </StyledIconButton>
      )}
    </Container>
  )
}

export default memo(Collection)
