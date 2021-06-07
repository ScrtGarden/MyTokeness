import { FC } from 'react'

import { Buttons, Header, SettingsCard, Wrapper } from '../../UI/Card'
import { Skeleton } from '../../UI/Loaders'

type Props = {
  hidebutton?: boolean
}

const SkeletonCard: FC<Props> = ({ hidebutton }) => (
  <SettingsCard>
    <Header>
      <Skeleton width="20%" noflex />
    </Header>
    <Wrapper>
      <Skeleton width="60%" noflex />
      <Skeleton width="40%" noflex />
      {!hidebutton && (
        <Buttons>
          <Skeleton width="56px" height="30px" noflex pill />
        </Buttons>
      )}
    </Wrapper>
  </SettingsCard>
)

export default SkeletonCard
