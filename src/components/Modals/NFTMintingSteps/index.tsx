import cryptoRandomString from 'crypto-random-string'
import { FC, memo, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'

import { InitMsg } from '../../../../interface/nft'
import { CONTRACT_CODE_ID, MAX_GAS } from '../../../../utils/constants'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import reducer from '../../../../utils/reducer'
import { useStoreState } from '../../../hooks/storeHooks'
import useMutationInitContract from '../../../hooks/useMutationInitContract'
import ContextStore from '../../CreateNFTPage/Store'
import Icon from '../../Icons'
import { CloseButton, Header, Title } from '../../UI/Modal'
import { formatForInstantiateMsg } from './lib'
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
  const { mutate: init, isLoading: initLoading } =
    useMutationInitContract<InitMsg>()
  // const { mutateAsync: uploadFile } = useMutationUploadFile()
  // const { mutate: mintNFT } = useMutationMintNFT()

  // component state
  const [status, setStatus] = useReducer<Reducer>(reducer, STATUS)

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
        onSuccess: ({ contractAddress }) => {
          setStatus({ 1: 'completed' })
          uploadAndMint()
        },
        onError: (error) => {
          setStatus({ 1: 'failed' })
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  const uploadAndMint = async () => {}

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
