import { FC, memo, useState } from 'react'

import { useStoreState } from '../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../hooks/useMutationConnectWallet'
import useMutationGetAccounts from '../../../hooks/useMutationGetAccounts'
import NFTMintingSteps from '../../Modals/NFTMintingSteps'
import { Content } from '../../UI/Containers'
import ContextStore from '../Store'
import Private from './Private'
import Public from './Public'
import { StyledModal } from './styles'

type Props = {
  isDraft: boolean
  contractAddress: string
}

const Form: FC<Props> = ({ isDraft, contractAddress }) => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // context store state
  const publicData = ContextStore.useStoreState((state) => state.publicMetadata)
  const privateData = ContextStore.useStoreState(
    (state) => state.privateMetadata
  )
  const hasError = ContextStore.useStoreState(
    (state) => state.validation.hasError
  )
  const errors = ContextStore.useStoreState((state) => state.validation.errors)

  // context store actions
  const setPublicFile = ContextStore.useStoreActions(
    (actions) => actions.setPublicFile
  )
  const setPublicData = ContextStore.useStoreActions(
    (actions) => actions.setPublicMetadata
  )
  const setAttributes = ContextStore.useStoreActions(
    (actions) => actions.setAttributes
  )
  const setPrivateFile = ContextStore.useStoreActions(
    (actions) => actions.setPrivateFile
  )
  const setPrivateData = ContextStore.useStoreActions(
    (actions) => actions.setPrivateMetadata
  )
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
        <Public
          data={publicData}
          setFile={setPublicFile}
          setData={setPublicData}
          setAttributes={setAttributes}
          errors={errors}
        />
        <Private
          data={privateData}
          setData={setPrivateData}
          setFile={setPrivateFile}
          onSubmit={onSubmit}
          loading={connecting || gettingAccounts}
        />
      </Content>
      <StyledModal isOpen={showModal}>
        <NFTMintingSteps
          toggle={() => setShowModal(!showModal)}
          isDraft={isDraft}
          contractAddress={contractAddress}
        />
      </StyledModal>
    </>
  )
}

export default memo(Form)
