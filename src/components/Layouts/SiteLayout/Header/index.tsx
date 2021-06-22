import Link from 'next/link'

import { useStoreState } from '../../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../../hooks/useMutationConnectWallet'
import useMutationGetAccounts from '../../../../hooks/useMutationGetAccounts'
import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import Icon from '../../../Icons'
import Avatar from './Avatar'
import { Brand, Container, Wrapper } from './styles'

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
        <Wrapper>
          <Icon name="crown-logo" height={30} width={30} />
          <Brand>MyTokeness</Brand>
        </Wrapper>
      </Link>

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
    </Container>
  )
}

export default Header
