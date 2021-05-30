import cryptoRandomString from 'crypto-random-string'
import { FC, memo, useEffect, useReducer, useState } from 'react'
import { toast } from 'react-toastify'

import {
  HandleBatchMintNFT,
  HandleMintNFT,
  InitMsg,
} from '../../../../interface/nft'
import { CONTRACT_CODE_ID, MAX_GAS } from '../../../../utils/constants'
import decoder from '../../../../utils/decoder'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import reducer from '../../../../utils/reducer'
import { useStoreState } from '../../../hooks/storeHooks'
import useMutationExeContract from '../../../hooks/useMutationExeContract'
import useMutationInitContract from '../../../hooks/useMutationInitContract'
import useMutationUploadFile from '../../../hooks/useMutationUploadFile'
import ContextStore from '../../CreateNFTPage/Store'
import Icon from '../../Icons'
import { CloseButton, Header, Title } from '../../UI/Modal'
import { formatForHandleMsg, formatForInstantiateMsg } from './lib'
import Step from './Step'
import { Container, Steps } from './styles'

export type StatusOption = 'awaiting' | 'in-progress' | 'completed' | 'failed'

interface Status {
  [key: number]: StatusOption
}

const STATUS: Status = {
  1: 'awaiting',
  2: 'awaiting',
  3: 'awaiting',
}

type Reducer = (p: Status, u: Partial<Status>) => Status

type Props = {
  toggle: () => void
  isDraft: boolean
  contractAddress: string
}

const NFTMintingSteps: FC<Props> = ({ toggle, isDraft, contractAddress }) => {
  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)
  const collectionInfo = useStoreState((state) =>
    state.collections.collectionById(walletAddress, contractAddress)
  )

  // custom hook
  const { mutate: init } = useMutationInitContract<InitMsg>()
  const { mutateAsync: uploadFile } = useMutationUploadFile()
  const { mutate: mintNFT } =
    useMutationExeContract<HandleMintNFT | HandleBatchMintNFT>()

  // component state
  const [status, setStatus] = useReducer<Reducer>(reducer, STATUS)
  const [newAddress, setNewAddress] = useState(isDraft ? '' : contractAddress)

  // context store state
  const publicMetadata = ContextStore.useStoreState(
    (state) => state.publicMetadata
  )
  const publicFile = ContextStore.useStoreState((state) => state.publicFile)
  const privateMetadata = ContextStore.useStoreState(
    (state) => state.privateMetadata
  )
  const privateFile = ContextStore.useStoreState((state) => state.privateFile)

  useEffect(() => {
    isDraft ? instantiate() : uploadAndMint()
  }, [])

  const instantiate = () => {
    if (!collectionInfo) {
      return
    }

    setStatus({ 1: 'in-progress' })

    const initMsg = formatForInstantiateMsg(collectionInfo)

    init(
      {
        codeId: CONTRACT_CODE_ID.NFT,
        initMsg,
        label: `${initMsg.name} - ${cryptoRandomString({ length: 20 })}`,
        maxGas: MAX_GAS.NFT.INIT_MSG,
      },
      {
        onSuccess: ({ contractAddress: newAddress }) => {
          setStatus({ 1: 'completed' })
          setNewAddress(newAddress)
          uploadAndMint()
        },
        onError: (error) => {
          setStatus({ 1: 'failed' })
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  const uploadAndMint = async () => {
    setStatus({ 1: 'in-progress' })

    // upload files and create link
    let publicFileLink = ''
    let privateFileLink = ''
    try {
      const publicResult = await uploadFile({ file: publicFile as File })
      publicFileLink = `ipfs://${publicResult.uploadFile.IpfsHash}/${publicFile?.name}`
      if (privateFile) {
        const privateResult = await uploadFile({ file: privateFile })
        privateFileLink = `ipfs://${privateResult.uploadFile.IpfsHash}/${privateFile.name}`
      }
    } catch (error) {
      toast.error('Uploading file.')
      setStatus({ 1: 'failed' })
      throw error
    }

    const handleMsg = formatForHandleMsg({
      publicMetadata,
      publicFileLink,
      privateMetadata,
      privateFileLink,
    })

    console.log({ handleMsg })

    mintNFT(
      {
        contractAddress: newAddress,
        handleMsg,
        maxGas:
          publicMetadata.supply === '1'
            ? MAX_GAS.NFT.MINT
            : MAX_GAS.NFT.BATCH_MINT,
      },
      {
        onSuccess: ({ data }) => {
          toast.success(`Minting collectible/s`)
          console.log(decoder(data))
          setStatus({ 1: 'completed' })
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
          setStatus({ 1: 'failed' })
        },
      }
    )
  }

  return (
    <Container>
      <Header>
        <Title>Add title</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      <Steps>
        {isDraft ? (
          <>
            <Step
              stepNumber={1}
              label="Create collection"
              hint="Instantiate contract with your custom configuration."
              status={status[1]}
              onClick={instantiate}
            />
            <Step
              stepNumber={2}
              label="Create collectibles"
              hint="File upload and mint collectibles to contract."
              status={status[2]}
              onClick={uploadAndMint}
            />
          </>
        ) : (
          <Step
            stepNumber={1}
            label="Mint collectible"
            hint="Uploading file and minting collectible"
            status={status[1]}
            onClick={uploadAndMint}
          />
        )}
      </Steps>
    </Container>
  )
}

export default memo(NFTMintingSteps)
