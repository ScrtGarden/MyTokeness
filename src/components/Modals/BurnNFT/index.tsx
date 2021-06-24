import { FC, memo, useState } from 'react'
import { InfiniteData, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { HandleBurnNFT, ResultTokens } from '../../../../interface/nft'
import { MAX_GAS } from '../../../../utils/constants'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import useMutationExeContract from '../../../hooks/useMutationExeContract'
import { nftDossierQueryKey } from '../../../hooks/useQueryNFTDossier'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import Icon from '../../Icons'
import { Button } from '../../UI/Buttons'
import { Field, Input, Label } from '../../UI/Forms'
import {
  Buttons,
  CloseButton,
  Content,
  Header,
  StyledIcon,
  Title,
} from '../../UI/Modal'
import { Text } from '../../UI/Typography'
import { tokensUpdater } from '../Transfer/lib'

type Props = {
  toggle: () => void
  tokenId: string
  contractAddress: string
  walletAddress: string
  name: string
  viewingKey: string
}

const BurnNFTModal: FC<Props> = (props) => {
  const { toggle, tokenId, contractAddress, name, walletAddress, viewingKey } =
    props
  const queryClient = useQueryClient()

  // component state
  const [memo, setMemo] = useState('')

  // custom hooks
  const { mutate, isLoading } = useMutationExeContract<HandleBurnNFT>()

  const onClickBurn = () => {
    mutate(
      {
        contractAddress,
        maxGas: MAX_GAS.NFT.BURN_NFT,
        handleMsg: { burn_nft: { token_id: tokenId, memo } },
      },
      {
        onSuccess: () => {
          queryClient.setQueryData<InfiniteData<ResultTokens>>(
            ['tokens', walletAddress, contractAddress],
            (prevData) => tokensUpdater(tokenId, prevData)
          )
          queryClient.setQueryData(
            nftDossierQueryKey(contractAddress, tokenId, {
              walletAddress,
              viewingKey,
            }),
            undefined
          )

          queryClient.invalidateQueries()
          toast.success('Burned asset to ashes.')
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
        <StyledIcon name="exclamation-circle" danger="true" />
        <Title isDanger>Burn asset</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      <Content spaced>
        <Text>
          The following asset, <span>{name}</span>, will be permanently deleted.
          Are you sure you want to continue?
        </Text>
        <Field>
          <Label>Memo (optional)</Label>
          <Input
            placeholder="Burn baby burn"
            value={memo}
            onChange={(e) => setMemo(e.currentTarget.value)}
          />
        </Field>
      </Content>
      <Buttons>
        <Button onClick={toggle}>Cancel</Button>
        <ButtonWithLoading
          text="Burn"
          isDanger
          onClick={onClickBurn}
          width={58}
          loading={isLoading}
        />
      </Buttons>
    </>
  )
}

export default memo(BurnNFTModal)
