import Router from 'next/router'
import { FC, memo, useMemo } from 'react'

import { QueryMinters, ResultMinters } from '../../../../../interface/nft'
import { CHAIN_EXPLORER } from '../../../../../utils/constants'
import truncateAddress from '../../../../../utils/truncateAddress'
import { useStoreState } from '../../../../hooks/storeHooks'
import useQueryContract from '../../../../hooks/useQueryContract'
import CopyIconButton from '../../../Common/CopyIconButton'
import {
  Button,
  IconButton,
  IconButtonWrapper,
  StyledIcon,
} from '../../../UI/Buttons'
import { Skeleton } from '../../../UI/Loaders'
import {
  AddressWrapper,
  Container,
  SkeletonTitle,
  Subtext,
  Title,
  Wrapper,
} from './styles'

type Props = {
  title?: string
  contractAddress: string
  subtext?: string
  loading?: boolean
  activeTab: string
}

const Header: FC<Props> = ({
  title,
  contractAddress,
  subtext,
  loading,
  activeTab,
}) => {
  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // custom hooks
  const { data, isLoading } = useQueryContract<QueryMinters, ResultMinters>(
    ['minters', contractAddress],
    contractAddress,
    { minters: {} }
  )

  // component state
  const isAssets = useMemo(() => activeTab === 'assets', [activeTab])
  const showButton = useMemo(
    () =>
      data && data.minters.minters.some((address) => address === walletAddress),
    [data, walletAddress]
  )

  const onClickCreate = () => {
    Router.push(
      '/nft/collections/[contractAddress]/create',
      `/nft/collections/${contractAddress}/create`,
      { shallow: true }
    )
  }

  const onClickLink = () => {
    window.open(`${CHAIN_EXPLORER}/contracts/${contractAddress}`, '_blank')
  }

  return (
    <Container>
      <Wrapper>
        {loading && isAssets ? (
          <SkeletonTitle height="46px" width="40%" />
        ) : (
          <Title>{title}</Title>
        )}
        {isLoading && isAssets ? (
          <Skeleton width="109px" pill height="30px" noflex />
        ) : (
          isAssets &&
          showButton && (
            <Button isPrimary onClick={onClickCreate} width={109}>
              Create Asset
            </Button>
          )
        )}
      </Wrapper>
      <AddressWrapper>
        {subtext ? (
          <Subtext>{subtext}</Subtext>
        ) : (
          <>
            <Subtext>{truncateAddress(contractAddress)}</Subtext>
            <IconButtonWrapper>
              <CopyIconButton size="small" toCopy={contractAddress} />
              <IconButton onClick={onClickLink} size="small">
                <StyledIcon name="external-link-duo" width={12} height={12} />
              </IconButton>
            </IconButtonWrapper>
          </>
        )}
      </AddressWrapper>
    </Container>
  )
}

export default memo(Header)
