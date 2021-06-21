import { FC, memo, useState } from 'react'
import { toast } from 'react-toastify'
import { Contract } from 'secretjs'

import { CONTRACT_CODE_ID } from '../../../../utils/constants'
import decoder from '../../../../utils/decoder'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import { queryChain } from '../../../../utils/secretjs'
import { useStoreActions, useStoreState } from '../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../hooks/useMutationConnectWallet'
import useMutationCreateNFTKey from '../../../hooks/useMutationCreateNFTKey'
import useMutationGetAccounts from '../../../hooks/useMutationGetAccounts'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import { Text } from '../../UI/Typography'
import { Container } from './styles'

type Props = {
  contractAddress: string
  walletAddress?: string
}

const CreateViewingKey: FC<Props> = ({ walletAddress, contractAddress }) => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)
  const customCollections = useStoreState(
    (state) => state.collections.collectionsByAddress
  )

  // store actions
  const addKey = useStoreActions((actions) => actions.auth.setViewingKey)
  const addCollection = useStoreActions(
    (actions) => actions.collections.addCollection
  )

  // custom hooks
  const { mutateAsync: connectWallet } = useMutationConnectWallet()
  const { mutateAsync: getAccounts } = useMutationGetAccounts()
  const { mutate } = useMutationCreateNFTKey(contractAddress)

  // component state
  const [loading, setLoading] = useState(false)

  const onClickCreate = async () => {
    setLoading(true)
    let address = walletAddress
    let filtered: Contract[] = []

    if (!isConnected) {
      try {
        await connectWallet()
        const { accounts } = await getAccounts()
        address = accounts[0].address
      } catch (error) {
        setLoading(false)
        return
      }
    }

    try {
      const contracts = await queryChain.getContracts(CONTRACT_CODE_ID.NFT)
      filtered = contracts.filter((contract) => contract.creator === address)
    } catch (error) {
      setLoading(false)
      console.log(error)
      return
    }

    mutate(undefined, {
      onSettled: (data) => {
        if (data) {
          const {
            viewing_key: { key },
          } = decoder(data.data)

          addKey({
            contractAddress,
            key,
          })

          if (
            !filtered.some((item) => item.address === contractAddress) &&
            !customCollections.some((item) => item.address === contractAddress)
          ) {
            addCollection(contractAddress)
          }

          toast.success('Created viewing key.')
        }
      },
      onError: (error) => {
        setLoading(false)
        toast.error(parseErrorMsg(error))
      },
    })
  }

  return (
    <Container>
      <Text>Can&apos;t see privileged data?</Text>
      <ButtonWithLoading
        text="Create Viewing Key"
        isPrimary
        onClick={onClickCreate}
        width={154}
        loading={loading}
      />
    </Container>
  )
}

export default memo(CreateViewingKey)
