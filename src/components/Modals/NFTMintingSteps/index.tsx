import { ParsedUrlQuery } from 'querystring'

import { useRouter } from 'next/router'
import { FC, memo, useEffect, useMemo, useReducer, useState } from 'react'
import { toast } from 'react-toastify'

import { HandleBatchMintNFT, HandleMintNFT } from '../../../../interface/nft'
import { MAX_GAS } from '../../../../utils/constants'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import reducer from '../../../../utils/reducer'
import useMutationExeContract from '../../../hooks/useMutationExeContract'
import useMutationUploadFile from '../../../hooks/useMutationUploadFile'
import ContextStore from '../../CreateNFTPage/Store'
import Icon from '../../Icons'
import { CloseButton, Header, Title } from '../../UI/Modal'
import { formatForHandleMsg } from './lib'
import Step from './Step'
import { Container, Steps } from './styles'

export interface NFTMintRouterQuery extends ParsedUrlQuery {
  contractAddress: string
}
export type StatusOption = 'awaiting' | 'in-progress' | 'completed' | 'failed'
type Reducer = (p: Status, u: Partial<Status>) => Status
type Props = {
  toggle: () => void
}
interface Status {
  [key: number]: StatusOption
}

const STATUS: Status = {
  1: 'awaiting',
  2: 'awaiting',
}

const NFTMintingSteps: FC<Props> = ({ toggle }) => {
  const router = useRouter()
  const { contractAddress } = router.query as NFTMintRouterQuery

  // context store state
  const publicMetadata = ContextStore.useStoreState(
    (state) => state.publicMetadata
  )
  const publicFile = ContextStore.useStoreState((state) => state.publicFile)
  const privateMetadata = ContextStore.useStoreState(
    (state) => state.privateMetadata
  )
  const privateFile = ContextStore.useStoreState((state) => state.privateFile)

  // context store actions
  const reset = ContextStore.useStoreActions((actions) => actions.resetState)

  // custom hooks
  const { mutateAsync: uploadFile } = useMutationUploadFile()
  const { mutate: mintNFT } =
    useMutationExeContract<HandleMintNFT | HandleBatchMintNFT>()

  // component state
  const [status, setStatus] = useReducer<Reducer>(reducer, STATUS)
  const [publicFileLink, setPublicFileLink] = useState('')
  const [privateFileLink, setPrivateFileLink] = useState('')
  const isMultiMints = useMemo(
    () => publicMetadata.supply !== '1',
    [publicMetadata.supply]
  )
  const isMultiFiles = useMemo(
    () => !!(publicFile && privateFile),
    [publicFile, privateFile]
  )

  useEffect(() => {
    upload()
  }, [])

  const upload = async () => {
    setStatus({ 1: 'in-progress' })

    try {
      const publicResult = await uploadFile({ file: publicFile as File })
      setPublicFileLink(
        `ipfs://${publicResult.uploadFile.IpfsHash}/${publicFile?.name}`
      )

      if (privateFile) {
        const privateResult = await uploadFile({ file: privateFile })
        setPrivateFileLink(
          `ipfs://${privateResult.uploadFile.IpfsHash}/${privateFile.name}`
        )
      }

      setStatus({ 1: 'completed' })
      toast.success(`Uploaded file${isMultiFiles ? 's.' : '.'}`)
      mint()
    } catch (error) {
      toast.error(`Uploading file${isMultiFiles ? 's.' : '.'}`)
      setStatus({ 1: 'failed' })
      throw error
    }
  }

  const mint = () => {
    setStatus({ 2: 'in-progress' })

    const handleMsg = formatForHandleMsg({
      publicMetadata,
      publicFileLink,
      privateMetadata,
      privateFileLink,
    })

    mintNFT(
      {
        contractAddress,
        handleMsg,
        maxGas: !isMultiMints
          ? MAX_GAS.NFT.MINT
          : MAX_GAS.NFT.BATCH_MINT(publicMetadata.supply),
      },
      {
        onSuccess: () => {
          toast.success(
            `Minted ${publicMetadata.supply} collectible${
              isMultiMints ? 's' : ''
            }`
          )
          reset()
          setStatus({ 2: 'completed' })
          toggle()
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
          setStatus({ 2: 'failed' })
        },
      }
    )
  }

  return (
    <Container>
      <Header>
        <Title>{`Steps to create your collectible${
          isMultiMints ? 's' : ''
        }`}</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      <Steps>
        <Step
          stepNumber={1}
          label={`Upload file${isMultiFiles ? 's' : ''}`}
          hint={`Uploading file${isMultiFiles ? 's' : ''} to ipfs.`}
          status={status[1]}
          onClick={upload}
        />
        <Step
          stepNumber={2}
          label={`Create collectible${isMultiMints ? 's' : ''}`}
          hint={`Minting collectible${isMultiMints ? 's' : ''} to contract.`}
          status={status[2]}
          onClick={mint}
        />
      </Steps>
    </Container>
  )
}

export default memo(NFTMintingSteps)