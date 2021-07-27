import Link from 'next/link'

import { useStoreState } from '../../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../../hooks/useMutationConnectWallet'
import useMutationGetAccounts from '../../../../hooks/useMutationGetAccounts'
import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import Icon from '../../../Icons'
import Tooltip from '../../../UI/Tooltip'
import Avatar from './Avatar'
import { Brand, Container, Name, StyledAchor, Wrapper } from './styles'

const Header = (): JSX.Element => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // custom hooks
  const { mutateAsync: connectWallet, isLoading } = useMutationConnectWallet()
  const { mutate: getAccounts, isLoading: loadingAccounts } =
    useMutationGetAccounts()

  const onClickConnect = async () => {
    try {
      await connectWallet()
      getAccounts()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Link href="/" passHref>
        <Brand>
          <Icon name="flower" height={25} width={25} fill="#5eae91" />
          <Name>{`Secret Garden${
            process.env.NEXT_PUBLIC_IS_MAINNET === 'true' ? '' : ' (testnet)'
          }`}</Name>
        </Brand>
      </Link>
      <Wrapper>
        {process.env.NEXT_PUBLIC_IS_MAINNET === 'true' ? (
          <Tooltip content="Go to testnet" offset={[0, 15]}>
            <StyledAchor href="https://testnet.scrtgarden.com">
              Try before you buy
            </StyledAchor>
          </Tooltip>
        ) : (
          <StyledAchor href="https://scrtgarden.com">Go to mainnet</StyledAchor>
        )}
        {isConnected ? (
          <Avatar />
        ) : (
          <ButtonWithLoading
            text="Connect"
            width={80}
            onClick={onClickConnect}
            loading={isLoading || loadingAccounts}
            isPrimary
          />
        )}
      </Wrapper>
    </Container>
  )
}

export default Header
