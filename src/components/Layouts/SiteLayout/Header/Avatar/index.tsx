import commaNumber from 'comma-number'
import { memo } from 'react'
import { useQuery } from 'react-query'

import { queryChain } from '../../../../../../utils/secretjs'
import toBiggestDenomination from '../../../../../../utils/toBiggestDenomination'
import truncateAddress from '../../../../../../utils/truncateAddress'
import { useStoreState } from '../../../../../hooks/storeHooks'
import useCopyToClipboard from '../../../../../hooks/useCopyToClipboard'
import { Skeleton } from '../../../../UI/Loaders'
import Tooltip from '../../../../UI/Tooltip'
import {
  Address,
  Circle,
  Container,
  InfoPill,
  Outline,
  StyledIcon,
  Wrapper,
} from './styles'

const Avatar = () => {
  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  const { data, isLoading } = useQuery(
    ['nativeBalance', walletAddress],
    () => queryChain.getAccount(walletAddress),
    { enabled: !!walletAddress }
  )

  // custom hooks
  const [status, copy] = useCopyToClipboard(walletAddress)

  return (
    <Container>
      <InfoPill left>
        <Tooltip
          content={status === 'copied' ? 'Copied!' : 'Copy'}
          hideOnClick={false}
          placement="bottom-end"
          offset={[0, 15]}
        >
          <Address onClick={copy}>
            {truncateAddress(walletAddress, 7, 3)}
          </Address>
        </Tooltip>
      </InfoPill>
      <Wrapper>
        <Circle>
          <StyledIcon name="user-duo" />
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
