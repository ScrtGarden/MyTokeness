import { useStoreState } from '../../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../../hooks/useMutationConnectWallet'
import useMutationGetAccounts from '../../../../hooks/useMutationGetAccounts'
import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import { Brand, Circle, Container, StyledIcon } from './styles'

const Header = () => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // custom hooks
  const { mutateAsync: connectWallet, isLoading } = useMutationConnectWallet()
  const {
    mutate: getAccounts,
    isLoading: loadingAccounts,
  } = useMutationGetAccounts()

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
      <Brand>MyTokeness</Brand>
      {isConnected ? (
        <Circle>
          <StyledIcon name="user-crown-duo" />
        </Circle>
      ) : (
        <ButtonWithLoading
          text="Connect"
          width={80}
          onClick={onClickConnect}
          loading={isLoading || loadingAccounts}
        />
      )}
    </Container>
  )
}

export default Header
