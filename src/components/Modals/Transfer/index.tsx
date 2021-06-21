import { FC, memo, useEffect, useState } from 'react'
import { InfiniteData, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { HandleTransferNFT, ResultTokens } from '../../../../interface/nft'
import { MAX_GAS } from '../../../../utils/constants'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import useMutationExeContract from '../../../hooks/useMutationExeContract'
import { nftDossierQueryKey } from '../../../hooks/useQueryNFTDossier'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import MessageWithIcon from '../../Common/MessageWithIcon'
import Icon from '../../Icons'
import { Button } from '../../UI/Buttons'
import { Field, Input, Label } from '../../UI/Forms'
import { Buttons, CloseButton, Header, Title } from '../../UI/Modal'
import { Text } from '../../UI/Typography'
import { tokensUpdater, validate } from './lib'
import { StyledContent } from './styles'

type Props = {
  toggle: () => void
  tokenId: string
  contractAddress: string
  walletAddress: string
  name: string
  viewingKey: string
}

const TransferModal: FC<Props> = (props) => {
  const { toggle, tokenId, contractAddress, name, walletAddress, viewingKey } =
    props
  const queryClient = useQueryClient()

  // component state
  const [address, setAddress] = useState('')
  const [memo, setMemo] = useState('')
  const [error, setError] = useState('')

  // custom hooks
  const { mutate, isLoading } = useMutationExeContract<HandleTransferNFT>()

  // lifecycle
  useEffect(() => {
    setError('')
  }, [address])

  const onClickTransfer = async () => {
    const { hasError, errors } = validate(address, walletAddress)
    setError(errors.address)

    if (hasError) {
      return
    }

    const handleMsg = {
      transfer_nft: { recipient: address, token_id: tokenId, memo },
    }

    mutate(
      {
        contractAddress,
        maxGas: MAX_GAS.NFT.TRANSFER_NFT,
        handleMsg,
      },
      {
        onSuccess: () => {
          const tokensKey = ['tokens', walletAddress, contractAddress]
          const dossierKey = nftDossierQueryKey(contractAddress, tokenId, {
            walletAddress,
            viewingKey,
          })

          queryClient.setQueryData<InfiniteData<ResultTokens>>(
            tokensKey,
            (prevData) => tokensUpdater(tokenId, prevData)
          )
          queryClient.setQueryData(dossierKey, undefined)

          queryClient.invalidateQueries()
          toast.success('Transferred asset to recipient.')
          toggle()
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  return (
    <>
      <Header>
        <Title>Transfer asset</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      <StyledContent>
        <Text>
          Transfer ownership of, <span>{name}</span>, to:
        </Text>
        <Field>
          <Label>Recipient&apos;s address</Label>
          <Input
            placeholder="secret1gvjcte2asddt09394s3r2aqhllgchg4608fmew"
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            autoFocus
            validation={!!error ? 'error' : undefined}
          />
          {!!error && <MessageWithIcon validation="error" message={error} />}
        </Field>
        <Field>
          <Label>Memo (optional)</Label>
          <Input
            placeholder="I didn't get the memo"
            value={memo}
            onChange={(e) => setMemo(e.currentTarget.value)}
          />
        </Field>
      </StyledContent>
      <Buttons>
        <Button onClick={toggle}>Cancel</Button>
        <ButtonWithLoading
          text="Transfer"
          isPrimary
          onClick={onClickTransfer}
          width={81}
          loading={isLoading}
        />
      </Buttons>
    </>
  )
}

export default memo(TransferModal)
