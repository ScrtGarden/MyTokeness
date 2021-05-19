import { FC, FormEvent, memo, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  QueryTokenInfo,
  ResultTokenInfo,
} from '../../../../../interface/snip20'
import { MAX_GAS } from '../../../../../utils/constants'
import parseErrorMsg from '../../../../../utils/parseErrorMsg'
import { amountPattern } from '../../../../../utils/regexPatterns'
import { useStoreState } from '../../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../../hooks/useMutationConnectWallet'
import useMutationExeContract from '../../../../hooks/useMutationExeContract'
import useMutationGetAccounts from '../../../../hooks/useMutationGetAccounts'
import useQueryContract from '../../../../hooks/useQueryContract'
import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Field, Input, InputGroup, Label, Symbol } from '../../../UI/Forms'
import { StyledDots } from '../../../UI/Loaders'
import { format, validate } from './lib'

type Props = {
  contractAddress: string
  enableButton?: boolean
  success?: boolean
}

const BurnCard: FC<Props> = ({ contractAddress, enableButton, success }) => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // component state
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [error, setError] = useState('')

  // custom hooks
  const { mutateAsync: connect, isLoading: connecting } =
    useMutationConnectWallet()
  const { mutateAsync: getAccounts, isLoading: gettingAccounts } =
    useMutationGetAccounts()
  const { mutate, isLoading: burning } = useMutationExeContract()

  const { data, isLoading: fetchingInfo } = useQueryContract<
    QueryTokenInfo,
    ResultTokenInfo
  >(
    ['snip20', 'tokenInfo', contractAddress],
    contractAddress,
    { token_info: {} },
    {
      enabled: success,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )

  // lifecycles
  useEffect(() => {
    setAmount('')
  }, [data])

  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [amount])

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
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  return (
    <Card>
      <Header>Burn Tokens</Header>
      <Wrapper>
        <Field>
          <Label>Amount</Label>
          <InputGroup>
            <Input placeholder="0.0" value={amount} onChange={onChangeAmount} />
            <Symbol>
              {fetchingInfo && <StyledDots />}
              {!fetchingInfo && !data && '--'}
              {!fetchingInfo && data?.token_info.symbol}
            </Symbol>
          </InputGroup>
          {error && <MessageWithIcon validation="error" message={error} />}
        </Field>
        <Field>
          <Label>Memo (optional)</Label>
          <Input
            placeholder="Disco inferno..."
            value={memo}
            onChange={(e) => setMemo(e.currentTarget.value)}
          />
        </Field>
        <ButtonWithLoading
          text="Burn"
          isPrimary
          onClick={onBurn}
          loading={connecting || gettingAccounts || burning}
          disabled={!enableButton}
        />
      </Wrapper>
    </Card>
  )
}

export default memo(BurnCard)
