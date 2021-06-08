import cryptoRandomString from 'crypto-random-string'
import { useRouter } from 'next/router'
import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { HandleCreateViewingKey } from '../../../../interface/nft'
import { MAX_GAS } from '../../../../utils/constants'
import decoder from '../../../../utils/decoder'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import { useStoreActions, useStoreState } from '../../../hooks/storeHooks'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'
import useMutationConnectWallet from '../../../hooks/useMutationConnectWallet'
import useMutationExeContract from '../../../hooks/useMutationExeContract'
import useMutationGetAccounts from '../../../hooks/useMutationGetAccounts'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import { CollectionRouterQuery } from '../../Layouts/CollectionLayout'
import ImportViewingKey from '../../Modals/ImportViewingKey'
import Warning from '../../Modals/Warning'
import { Button, IconButton, StyledIcon } from '../../UI/Buttons'
import { Header, SettingsCard, Wrapper } from '../../UI/Card'
import { Input } from '../../UI/Forms'
import { Modal } from '../../UI/Modal'
import { Actions, Buttons, InputButtonsWrapper } from './styles'

const ViewingKeyCard = () => {
  const router = useRouter()
  const { contractAddress } = router.query as CollectionRouterQuery

  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)
  const viewingKey = useStoreState((state) =>
    state.auth.keyByContractAddress(contractAddress as string)
  )

  // store actions
  const setKey = useStoreActions((actions) => actions.auth.setViewingKey)
  const removeKey = useStoreActions((actions) => actions.auth.removeViewingKey)

  // custom hooks
  const [_, copy] = useCopyToClipboard(viewingKey)
  const { mutateAsync: connectWallet, isLoading: connecting } =
    useMutationConnectWallet()
  const { mutateAsync: getAccounts, isLoading: gettingAccounts } =
    useMutationGetAccounts()
  const { mutate, isLoading } = useMutationExeContract<HandleCreateViewingKey>()

  // component state
  const [showWarning, setShowWarning] = useState(false)
  const [showImport, setShowImport] = useState(false)

  const onClickGetKey = async () => {
    if (!isConnected) {
      try {
        await connectWallet()
        await getAccounts()
      } catch (error) {
        return
      }
    }

    mutate(
      {
        contractAddress,
        maxGas: MAX_GAS.NFT.CREATE_VIEWING_KEY,
        handleMsg: {
          create_viewing_key: {
            entropy: cryptoRandomString({ length: 40, type: 'base64' }),
          },
        },
      },
      {
        onSuccess: ({ data }) => {
          const {
            viewing_key: { key },
          } = decoder(data)

          setKey({
            contractAddress,
            key,
          })
          toast.success('Created viewing key.')
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  const onClickRemove = () => {
    removeKey(contractAddress)
    setShowWarning(false)
    toast.success('Removed viewing key.')
  }

  const onClickImport = async (newKey: string) => {
    if (!isConnected) {
      try {
        await connectWallet()
        await getAccounts()
      } catch (error) {
        return
      }
    }

    setKey({ contractAddress, key: newKey })
    setShowImport(false)
    toast.success('Imported viewing key.')
  }

  return (
    <>
      <SettingsCard>
        <Header>Viewing Key</Header>
        <Wrapper>
          <InputButtonsWrapper>
            <Input value={viewingKey || ''} disabled onChange={() => null} />
            <Actions>
              <IconButton disabled={!viewingKey} onClick={copy}>
                <StyledIcon name="copy-duo" />
              </IconButton>
              <IconButton
                disabled={!viewingKey}
                onClick={() => setShowWarning(true)}
              >
                <StyledIcon name="trash-duo" />
              </IconButton>
            </Actions>
          </InputButtonsWrapper>
          <Buttons>
            <Button onClick={() => setShowImport(true)}>Import</Button>
            <ButtonWithLoading
              text={`${viewingKey ? 'Rotate' : 'Get'} Key`}
              width={viewingKey ? 97 : 76}
              isPrimary
              loading={
                (connecting || gettingAccounts || isLoading) && !showImport
              }
              onClick={onClickGetKey}
            />
          </Buttons>
        </Wrapper>
      </SettingsCard>
      <Modal
        isOpen={showWarning}
        onBackgroundClick={() => setShowWarning(!showWarning)}
      >
        <Warning
          title="Remove viewing key from collection"
          text="The viewing key enables you to see private collectibles you own. Are you sure you want to remove it?"
          toggle={() => setShowWarning(!showWarning)}
          onClickPrimary={onClickRemove}
        />
      </Modal>
      <Modal
        isOpen={showImport}
        onBackgroundClick={() => setShowImport(!showImport)}
      >
        <ImportViewingKey
          toggle={() => setShowImport(!showImport)}
          onClickPrimary={onClickImport}
          loading={(connecting || gettingAccounts) && showImport}
        />
      </Modal>
    </>
  )
}

export default memo(ViewingKeyCard)
