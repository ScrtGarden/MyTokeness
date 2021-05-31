import { memo, useState } from 'react'

import { useStoreState } from '../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../hooks/useMutationConnectWallet'
import useMutationGetAccounts from '../../../hooks/useMutationGetAccounts'
import NFTMintingSteps from '../../Modals/NFTMintingSteps'
import { Content } from '../../UI/Containers'
import ContextStore from '../Store'
import Private from './Private'
import Public from './Public'
import { StyledModal } from './styles'

const Form = () => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // context store state
  const hasError = ContextStore.useStoreState(
    (state) => state.validation.hasError
  )

  // context store actions
  const setSubmitted = ContextStore.useStoreActions(
    (actions) => actions.setHasSubmitted
  )

  // custom hooks
  const { mutateAsync: connectWallet, isLoading: connecting } =
    useMutationConnectWallet()
  const { mutateAsync: getAccounts, isLoading: gettingAccounts } =
    useMutationGetAccounts()

  // component state
  const [showModal, setShowModal] = useState(false)

  const onSubmit = async () => {
    setSubmitted(true)

    if (hasError) {
      return
    }

    if (!isConnected) {
      try {
        await connectWallet()
        await getAccounts()
      } catch (error) {
        throw error
      }
    }

    setShowModal(true)
  }

  return (
    <>
      <Content>
        <Public />
        <Private onSubmit={onSubmit} loading={connecting || gettingAccounts} />
      </Content>
      <StyledModal isOpen={showModal}>
        <NFTMintingSteps toggle={() => setShowModal(!showModal)} />
      </StyledModal>
    </>
  )
}

export default memo(Form)
