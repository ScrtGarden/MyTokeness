import cryptoRandomString from 'crypto-random-string'
import Router from 'next/router'
import { FC, memo, useEffect, useReducer, useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { Contract } from 'secretjs'

import { InitMsg, ResultContractInfo } from '../../../../interface/nft'
import { Config } from '../../../../interface/nft-ui'
import { CONTRACT_CODE_ID, MAX_GAS } from '../../../../utils/constants'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import reducer from '../../../../utils/reducer'
import { symbolPattern } from '../../../../utils/regexPatterns'
import { useStoreState } from '../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../hooks/useMutationConnectWallet'
import useMutationGetAccounts from '../../../hooks/useMutationGetAccounts'
import useMutationInitContract from '../../../hooks/useMutationInitContract'
import { StyledIcon } from '../../UI/Buttons'
import { CloseButton, Content, Header, Title } from '../../UI/Modal'
import Form from './Form'
import { formatForInstantiateMsg, validate } from './lib'

export interface Errors {
  name: string
  symbol: string
}

type ConfigReducer = (p: Config, u: Partial<Config>) => Config
type ErrorsReducer = (p: Errors, u: Partial<Errors>) => Errors

const CONFIGURATION = {
  publicTokenSupply: true,
  publicOwner: false,
  enableSealedMetadata: false,
  unwrappedMetadataIsPrivate: true,
  minterMayUpdateMetadata: false,
  ownerMayUpdateMetadata: false,
  enableBurn: false,
}

const ERRORS = { name: '', symbol: '' }

type Props = {
  toggle: () => void
}

const CreateCollectionModal: FC<Props> = ({ toggle }) => {
  const queryClient = useQueryClient()

  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // component state
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [config, setConfig] = useReducer<ConfigReducer>(reducer, CONFIGURATION)
  const [errors, setErrors] = useReducer<ErrorsReducer>(reducer, ERRORS)

  // custom hooks
  const { mutateAsync: connectWallet, isLoading: connecting } =
    useMutationConnectWallet()
  const { mutateAsync: getAccounts, isLoading: gettingAccounts } =
    useMutationGetAccounts()
  const { mutate, isLoading: creating } = useMutationInitContract<InitMsg>()

  // lifecycle
  useEffect(() => {
    if (errors.name) {
      setErrors({ name: '' })
    }
  }, [name])

  useEffect(() => {
    if (errors.symbol) {
      setErrors({ symbol: '' })
    }
  }, [symbol])

  const onChangeSymbol = (value: string) => {
    if (!value || value.match(symbolPattern)) {
      setSymbol(value)
    }
  }

  const onSubmit = async () => {
    const { hasErrors, ...rest } = validate(name, symbol)
    setErrors(rest)

    if (hasErrors) {
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

    const initMsg = formatForInstantiateMsg(name, symbol, config)
    const codeId = CONTRACT_CODE_ID.NFT
    const label = `${initMsg.name} - ${cryptoRandomString({ length: 20 })}`

    mutate(
      { codeId, initMsg, label, maxGas: MAX_GAS.NFT.INIT_MSG },
      {
        onSuccess: ({ contractAddress }) => {
          // get data
          const collectionsKey = ['collections', walletAddress]
          const collections =
            queryClient.getQueryData<Contract[] | undefined>(collectionsKey) ||
            []
          const updatedCollections = collections.concat([
            {
              address: contractAddress,
              codeId: CONTRACT_CODE_ID.NFT,
              creator: walletAddress,
              label,
            },
          ])

          // set data
          queryClient.setQueryData(collectionsKey, updatedCollections)
          queryClient.setQueryData<ResultContractInfo>(
            ['contractInfo', contractAddress],
            { contract_info: { name: initMsg.name, symbol: initMsg.symbol } }
          )

          // routing
          toggle()
          Router.push(
            `/nft/collections/[contractAddress]?title=${initMsg.name}`,
            `/nft/collections/${contractAddress}`,
            { shallow: true }
          )
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
        <Title>Create your collection</Title>
        <CloseButton onClick={toggle}>
          <StyledIcon name="times" />
        </CloseButton>
      </Header>
      <Content>
        <Form
          name={name}
          symbol={symbol}
          config={config}
          onChangeName={setName}
          onChangeSymbol={onChangeSymbol}
          onChangeConfig={setConfig}
          errors={errors}
          onSubmit={onSubmit}
          loading={connecting || gettingAccounts || creating}
        />
      </Content>
    </>
  )
}

export default memo(CreateCollectionModal)
