import { FC, MouseEvent, memo } from 'react'

import { StyledIcon as Icon } from '../../UI/Buttons'
import {
  Container,
  Label,
  SkeletonIcon,
  SkeletonLabel,
  StyledIcon,
  StyledIconButton,
  StyledTag,
} from './styles'

type Props = {
  name: string
  icon: string
  onClick: () => void
  loading?: boolean
  isOwner?: boolean
  onClickRemove?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Collection: FC<Props> = ({
  name,
  icon,
  onClick,
  loading,
  isOwner,
  onClickRemove,
}) => {
  return (
    <Container onClick={onClick}>
      {onClickRemove && !loading && (
        <StyledIconButton onClick={onClickRemove} size="small">
          <Icon name="trash-duo" width={12} height={12} />
        </StyledIconButton>
      )}
      {loading ? (
        <>
          <SkeletonLabel height="24px" width="80%" />
          <SkeletonIcon height="60px" width="60px" />
        </>
      ) : (
        <>
          <Label>{name}</Label>
          <StyledIcon name={icon} />
        </>
      )}
      {isOwner && !loading && <StyledTag color="blue">Owner</StyledTag>}
    </Container>
  )
}

export default memo(Collection)
