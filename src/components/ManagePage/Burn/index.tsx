import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import {
  QueryTokenInfo,
  ResultTokenConfig,
  ResultTokenInfo,
} from '../../../../interface/snip20'
import { MAX_GAS } from '../../../../utils/constants'
import decoder from '../../../../utils/decoder'
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
import BurnCard from './BurnCard'
import { format, validate } from './lib'

const Burn = () => {
  const queryClient = useQueryClient()

  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // component state
  const [contractAddress, setContractAddress] = useState(
    queryClient.getQueryData('selectedContractAddress') || ''
  )
  const debouncedAddy = useDebounce(contractAddress, 300)
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [error, setError] = useState('')

  const tokenConfig = queryClient.getQueryData<ResultTokenConfig>([
    'tokenConfig',
    debouncedAddy,
  ])

  const enableBurn = useMemo(
    () => tokenConfig && tokenConfig.token_config.burn_enabled,
    [tokenConfig]
  )

  // custom hooks
  const { mutateAsync: connect, isLoading: connecting } =
    useMutationConnectWallet()
  const { mutateAsync: getAccounts, isLoading: gettingAccounts } =
    useMutationGetAccounts()
  const { mutate, isLoading: burning } = useMutationExeContract()
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

  const onBurn = async () => {
    const { hasErrors, amount: amountError } = validate(amount)

    setError(amountError)

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

    const handleMsg = format(memo, amount, data?.token_info.decimals)

    mutate(
      { contractAddress, maxGas: MAX_GAS.SNIP20.BURN, handleMsg },
      {
        onSuccess: (test) => {
          toast.success(`Burnt ${amount} ${data?.token_info.symbol}`)
          setAmount('')
          setMemo('')
          console.log('From burn', decoder(test.data))
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
        <PageTitle>Burn Baby Burn</PageTitle>
        <Content single>
          <Snip20Selector
            value={contractAddress}
            debouncedValue={debouncedAddy}
            onChange={(e) => setContractAddress(e.currentTarget.value)}
            checkFor="burn"
          />
          <BurnCard
            amount={amount}
            memo={memo}
            onChangeAmount={onChangeAmount}
            onChangeMemo={(e) => setMemo(e.currentTarget.value)}
            isLoadingSymbol={isLoading}
            symbol={data?.token_info.symbol}
            isBurning={burning || connecting || gettingAccounts}
            onSubmit={onBurn}
            enableButton={enableBurn}
            error={error}
          />
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default Burn
