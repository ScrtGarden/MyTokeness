import Router from 'next/router'
import { FC, memo, useMemo } from 'react'

import { QueryMinters, ResultMinters } from '../../../../../interface/nft'
import {
  CHAIN_EXPLORER,
  MYTOKENESS_NFT_CONTRACTS,
} from '../../../../../utils/constants'
import truncateAddress from '../../../../../utils/truncateAddress'
import { useStoreState } from '../../../../hooks/storeHooks'
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard'
import useQueryContract from '../../../../hooks/useQueryContract'
import { Button, IconButton, StyledIcon } from '../../../UI/Buttons'
import { Skeleton } from '../../../UI/Loaders'
import {
  Actions,
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
  const [_, copy] = useCopyToClipboard(contractAddress)
  const { data, isLoading } = useQueryContract<QueryMinters, ResultMinters>(
    ['minters', contractAddress],
    contractAddress,
    { minters: {} }
  )

  // component state
  const isAssets = useMemo(() => activeTab === 'assets', [activeTab])
  const showButton = useMemo(
    () =>
      (data &&
        data.minters.minters.some((address) => address === walletAddress)) ||
      !!MYTOKENESS_NFT_CONTRACTS[contractAddress],
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
        {isLoading ? (
          <Skeleton width="143px" pill height="30px" noflex />
        ) : (
          isAssets &&
          showButton && (
            <Button isPrimary onClick={onClickCreate} width={143}>
              Create Collectible
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
            <Actions>
              <IconButton onClick={copy}>
                <StyledIcon name="copy-duo" />
              </IconButton>
              <IconButton onClick={onClickLink}>
                <StyledIcon name="external-link-duo" />
              </IconButton>
            </Actions>
          </>
        )}
      </AddressWrapper>
    </Container>
  )
}

export default memo(Header)
