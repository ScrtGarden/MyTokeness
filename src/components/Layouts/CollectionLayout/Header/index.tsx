import Router from 'next/router'
import { FC, memo } from 'react'

import { CHAIN_EXPLORER } from '../../../../../utils/constants'
import truncateAddress from '../../../../../utils/truncateAddress'
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard'
import Icon from '../../../Icons'
import { Button, IconButton, StyledIcon } from '../../../UI/Buttons'
import { PageTitle } from '../../../UI/Typography'
import { AddressWrapper, Container, Subtext, Title, Wrapper } from './styles'

type Props = {
  title?: string
  contractAddress: string
  subtext?: string
}

const Header: FC<Props> = ({ title, contractAddress, subtext }) => {
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
        <Title>{title}</Title>
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
      </Wrapper>
      <Button isPrimary onClick={onClickCreate}>
        Create Collectible
      </Button>
    </Container>
  )
}

export default memo(Header)
