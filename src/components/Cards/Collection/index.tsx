import { FC, memo } from 'react'

import {
  Container,
  Label,
  SkeletonIcon,
  SkeletonLabel,
  StyledIcon,
} from './styles'

type Props = {
  name: string
  icon: string
  onClick: () => void
  loading?: boolean
}

const Collection: FC<Props> = ({ name, icon, onClick, loading }) => {
  return (
    <Container onClick={onClick}>
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
    </Container>
  )
}

export default memo(Collection)
