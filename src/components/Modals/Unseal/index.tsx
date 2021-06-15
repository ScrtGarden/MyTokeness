import { FC, memo } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { HandleReveal } from '../../../../interface/nft'
import { MAX_GAS } from '../../../../utils/constants'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import useMutationExeContract from '../../../hooks/useMutationExeContract'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import Icon from '../../Icons'
import { Button } from '../../UI/Buttons'
import { Buttons, CloseButton, Content, Header, Title } from '../../UI/Modal'
import { Text } from '../../UI/Typography'

type Props = {
  toggle: () => void
  name: string
  tokenId: string
  contractAddress: string
}

const UnsealModal: FC<Props> = (props) => {
  const { toggle, name, tokenId, contractAddress } = props
  const queryClient = useQueryClient()

  // custom hook
  const { mutate, isLoading } = useMutationExeContract<HandleReveal>()

  const onClickUnseal = () => {
    mutate(
      {
        contractAddress,
        maxGas: MAX_GAS.NFT.REVEAL,
        handleMsg: { reveal: { token_id: tokenId } },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            'nftDossier',
            contractAddress,
            tokenId,
          ])
          toast.success("You can now view the asset's private contents.")
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
        <Title>Unseal private data</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      <Content>
        <Text>
          The following asset, <span>{name}</span>, will be permanently
          unsealed. Are you sure you want to continue?
        </Text>
      </Content>
      <Buttons>
        <Button onClick={toggle}>Cancel</Button>
        <ButtonWithLoading
          text="Unseal"
          onClick={onClickUnseal}
          isPrimary
          width={71}
          loading={isLoading}
        />
      </Buttons>
    </>
  )
}

export default memo(UnsealModal)
