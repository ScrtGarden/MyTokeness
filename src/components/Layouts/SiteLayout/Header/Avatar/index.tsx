import commaNumber from 'comma-number'
import { memo } from 'react'
import { useQuery } from 'react-query'

import { queryChain } from '../../../../../../utils/secretjs'
import toBiggestDenomination from '../../../../../../utils/toBiggestDenomination'
import truncateAddress from '../../../../../../utils/truncateAddress'
import { useStoreState } from '../../../../../hooks/storeHooks'
import { Skeleton } from '../../../../UI/Loaders'
import {
  Circle,
  Container,
  InfoPill,
  Outline,
  StyledIcon,
  Wrapper,
} from './styles'

const Avatar = () => {
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  const { data, isLoading } = useQuery(
    ['nativeBalance', walletAddress],
    () => queryChain.getAccount(walletAddress),
    { enabled: !!walletAddress }
  )

  return (
    <Container>
      <InfoPill left>{truncateAddress(walletAddress, 7, 3)}</InfoPill>
      <Wrapper>
        <Circle>
          <StyledIcon name="user-crown-duo" />
        </Circle>
        <Outline />
      </Wrapper>
      <InfoPill right>
        {isLoading ? (
          <>
            <Skeleton width="50px" /> &nbsp;&nbsp;SCRT
          </>
        ) : (
          `${commaNumber(
            toBiggestDenomination(data?.balance[0].amount, 6)
          )} SCRT`
        )}
      </InfoPill>
    </Container>
  )
}

export default memo(Avatar)
