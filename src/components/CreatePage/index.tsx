import cryptoRandomString from 'crypto-random-string'
import { MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { CONTRACT_CODE_ID, MAX_GAS } from '../../../utils/constants'
import { useStoreState } from '../../hooks/storeHooks'
import useMutationConnectWallet from '../../hooks/useMutationConnectWallet'
import useMutationGetAccounts from '../../hooks/useMutationGetAccounts'
import useMutationInitContract from '../../hooks/useMutationInitContract'
import ButtonWithLoading from '../Common/ButtonWithLoading'
import CreatedTokenModal from '../Modals/CreatedToken'
import { Container, InnerContainer } from '../UI/Containers'
import { PageTitle } from '../UI/Typography'
import Configuration from './Form/Configuration'
import Details from './Form/Details'
import InitialBalances from './Form/InitialBalances'
import Review from './Form/Review'
import { Form } from './Form/styles'
import { formatter } from './lib'
import Store from './Store'
import { Content } from './styles'

const CreatePage = () => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // context store state
  const name = Store.useStoreState((state) => state.name)
  const symbol = Store.useStoreState((state) => state.symbol)
  const decimals = Store.useStoreState((state) => state.decimals)
  const adminAddress = Store.useStoreState((state) => state.adminAddress)
  const enablePublicTokenSupply = Store.useStoreState(
    (state) => state.enablePublicTokenSupply
  )
  const enableDeposit = Store.useStoreState((state) => state.enableDeposit)
  const enableRedeem = Store.useStoreState((state) => state.enableRedeem)
  const enableMint = Store.useStoreState((state) => state.enableMint)
  const enableBurn = Store.useStoreState((state) => state.enableBurn)
  const initialBalances = Store.useStoreState((state) => state.initialBalances)
  const hasErrors = Store.useStoreState((state) => state.validation.hasErrors)

  // context store actions
  const setState = Store.useStoreActions((actions) => actions.setState)

  // custom hooks
  const {
    mutateAsync: connectWallet,
    isLoading: connecting,
  } = useMutationConnectWallet()
  const {
    mutateAsync: getAccounts,
    isLoading: gettingAccounts,
  } = useMutationGetAccounts()
  const { mutate, isLoading } = useMutationInitContract()

  // component state
  const [showModal, setShowModal] = useState(true)

  const onClickCreate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setState({ key: 'hasTriedSubmitting', data: true })

    if (hasErrors) {
      return
    }

    if (!isConnected) {
      try {
        await connectWallet()
        await getAccounts()
      } catch (error) {
        console.log(error)
        return
      }
    }

    const initMsg = formatter({
      name,
      symbol,
      decimals,
      adminAddress,
      enablePublicTokenSupply,
      enableDeposit,
      enableRedeem,
      enableMint,
      enableBurn,
      initialBalances,
    })

    mutate({
      codeId: CONTRACT_CODE_ID.SNIP20,
      initMsg,
      label: `${name} ${cryptoRandomString({ length: 15 })}`,
      maxGas: MAX_GAS.SNIP20_INIT_MSG,
    })
  }

  return (
    <>
      <Container>
        <InnerContainer>
          <PageTitle>Create your token</PageTitle>
          <Content>
            <Form>
              <Details />
              <Configuration />
            </Form>
            <Form>
              <InitialBalances />
              <Review />
              <ButtonWithLoading
                text="Create"
                isStretched
                isPrimary
                onClick={onClickCreate}
                loading={connecting || gettingAccounts || isLoading}
              />
            </Form>
          </Content>
        </InnerContainer>
      </Container>
      <CreatedTokenModal
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
      />
    </>
  )
}

const CreatePageWithStore = () => (
  <Store.Provider>
    <CreatePage />
  </Store.Provider>
)

export default CreatePageWithStore
