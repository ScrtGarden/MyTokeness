import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import {
  HandleMsgMint,
  QueryTokenInfo,
  ResultTokenConfig,
  ResultTokenInfo,
} from '../../../../interface/snip20'
import { MAX_GAS } from '../../../../utils/constants'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import { amountPattern } from '../../../../utils/regexPatterns'
import { useStoreState } from '../../../hooks/storeHooks'
import useDebounce from '../../../hooks/useDebounce'
import useMutationConnectWallet from '../../../hooks/useMutationConnectWallet'
import useMutationExeContract from '../../../hooks/useMutationExeContract'
import useMutationGetAccounts from '../../../hooks/useMutationGetAccounts'
import useQueryContract from '../../../hooks/useQueryContract'
import Snip20Selector from '../../Cards/Snip20Selector'
import { Container, Content, InnerContainer } from '../../UI/Containers'
import { PageTitle } from '../../UI/Typography'
import { format, validate } from './lib'
import MintCard from './MintCard'

const Mint = () => {
  const queryClient = useQueryClient()

  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // component state
  const [contractAddress, setContractAddress] = useState(
    queryClient.getQueryData('selectedContractAddress') || ''
  )
  const debouncedAddy = useDebounce(contractAddress, 300)
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [errors, setErrors] = useState({ amount: '', recipient: '' })

  const tokenConfig = queryClient.getQueryData<ResultTokenConfig>([
    'tokenConfig',
    debouncedAddy,
  ])

  // custom hooks
  const { data, isLoading } = useQueryContract<QueryTokenInfo, ResultTokenInfo>(
    ['tokenInfo', debouncedAddy],
    debouncedAddy,
    { token_info: {} },
    {
      enabled: !!debouncedAddy,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )
  const { mutateAsync: connect, isLoading: connecting } =
    useMutationConnectWallet()
  const { mutateAsync: getAccounts, isLoading: gettingAccounts } =
    useMutationGetAccounts()
  const { mutate, isLoading: minting } = useMutationExeContract<HandleMsgMint>()

  // lifecycles
  useEffect(() => {
    setAmount('')
  }, [data])

  const onChangeAmount = (e: FormEvent<HTMLInputElement>) => {
    const amount = e.currentTarget.value
    if (
      !amount ||
      amount.match(amountPattern(data?.token_info.decimals as number))
    ) {
      setAmount(amount)
    }
  }

  const enableMint = useMemo(
    () => tokenConfig && tokenConfig.token_config.mint_enabled,
    [tokenConfig]
  )

  const onMint = async () => {
    const { hasErrors, ...rest } = validate(recipient, amount)

    setErrors(rest)

    if (hasErrors) {
      return
    }

    if (!isConnected) {
      try {
        await connect()
        await getAccounts()
      } catch (error) {
        throw error
      }
    }

    const handleMsg = format(recipient, amount, data?.token_info.decimals)

    mutate(
      { contractAddress, maxGas: MAX_GAS.SNIP20.MINT, handleMsg },
      {
        onSuccess: () => {
          toast.success(`Minted ${amount} ${data?.token_info.symbol}`)
          setAmount('')
          setRecipient('')
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  return (
    <Container>
      <InnerContainer>
        <PageTitle>Mint</PageTitle>
        <Content>
          <Snip20Selector
            value={contractAddress}
            debouncedValue={debouncedAddy}
            onChange={(e) => setContractAddress(e.currentTarget.value)}
          />
          <MintCard
            amount={amount}
            onChangeAmount={onChangeAmount}
            recipient={recipient}
            onChangeRecipient={(e) => setRecipient(e.currentTarget.value)}
            enableButton={enableMint}
            isLoading={isLoading}
            symbol={data?.token_info.symbol}
            errors={errors}
            onSubmit={onMint}
            isMinting={connecting || gettingAccounts || minting}
          />
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default Mint
