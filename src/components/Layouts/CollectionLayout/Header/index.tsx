import Router from 'next/router'
import { FC, memo, useMemo } from 'react'

import { CHAIN_EXPLORER } from '../../../../../utils/constants'
import truncateAddress from '../../../../../utils/truncateAddress'
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard'
import { Button, IconButton, StyledIcon } from '../../../UI/Buttons'
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
  // custom hooks
  const [_, copy] = useCopyToClipboard(contractAddress)

  // component state
  const isAssets = useMemo(() => activeTab === 'assets', [activeTab])

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
        {isAssets && (
          <Button isPrimary onClick={onClickCreate} width={143}>
            Create Collectible
          </Button>
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
