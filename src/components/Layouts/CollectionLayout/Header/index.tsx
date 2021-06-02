import Router from 'next/router'
import { FC, memo } from 'react'

import { CHAIN_EXPLORER } from '../../../../../utils/constants'
import truncateAddress from '../../../../../utils/truncateAddress'
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard'
import { Button, IconButton, StyledIcon } from '../../../UI/Buttons'
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
}

const Header: FC<Props> = ({ title, contractAddress, subtext, loading }) => {
  // custom hooks
  const [_, copy] = useCopyToClipboard(contractAddress)

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
        {loading ? (
          <SkeletonTitle height="46px" width="40%" />
        ) : (
          <Title>{title}</Title>
        )}
        <Button isPrimary onClick={onClickCreate} width={143}>
          Create Collectible
        </Button>
      </Wrapper>
      <AddressWrapper>
        {subtext ? (
          <Subtext>{subtext}</Subtext>
        ) : (
          <>
            <Subtext>{truncateAddress(contractAddress)}</Subtext>
            <IconButton onClick={copy}>
              <StyledIcon name="copy-duo" />
            </IconButton>
            <IconButton onClick={onClickLink}>
              <StyledIcon name="external-link-duo" />
            </IconButton>
          </>
        )}
      </AddressWrapper>
    </Container>
  )
}

export default memo(Header)
