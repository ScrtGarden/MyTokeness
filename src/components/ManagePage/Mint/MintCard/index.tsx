import { FC, FormEvent, memo, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { HandleMsgMint } from '../../../../../interface/snip20'
import { MAX_GAS } from '../../../../../utils/constants'
import parseErrorMsg from '../../../../../utils/parseErrorMsg'
import { amountPattern } from '../../../../../utils/regexPatterns'
import { useStoreState } from '../../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../../hooks/useMutationConnectWallet'
import useMutationExeContract from '../../../../hooks/useMutationExeContract'
import useMutationGetAccounts from '../../../../hooks/useMutationGetAccounts'
import useQuerySnip20Info from '../../../../hooks/useQuerySnip20Info'
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

const MintCard: FC<Props> = ({ success, enableButton, contractAddress }) => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // component state
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [memo, setMemo] = useState('')
  const [errors, setErrors] = useState({ amount: '', recipient: '' })

  // custom hooks
  const { mutateAsync: connect, isLoading: connecting } =
    useMutationConnectWallet()
  const { mutateAsync: getAccounts, isLoading: gettingAccounts } =
    useMutationGetAccounts()
  const { mutate, isLoading: minting } = useMutationExeContract<HandleMsgMint>()

  const { data, isLoading: fetchingInfo } = useQuerySnip20Info(
    contractAddress,
    { enabled: success }
  )

  // lifecycles
  useEffect(() => {
    setAmount('')
  }, [data])

  useEffect(() => {
    if (errors.recipient) {
      setErrors({ ...errors, recipient: '' })
    }
  }, [recipient])

  useEffect(() => {
    if (errors.amount) {
      setErrors({ ...errors, amount: '' })
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

    const handleMsg = format(recipient, memo, amount, data?.token_info.decimals)

    mutate(
      { contractAddress, maxGas: MAX_GAS.SNIP20.MINT, handleMsg },
      {
        onSuccess: () => {
          toast.success(`Minted ${amount} ${data?.token_info.symbol}`)
          setAmount('')
          setRecipient('')
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
      <Header>Mint</Header>
      <Wrapper>
        <Field>
          <Label>Recipient</Label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.currentTarget.value)}
            placeholder="secret1gvjcte2asddt09394s3r2aqhllgchg4608fmew"
          />
          {errors?.recipient && (
            <MessageWithIcon validation="error" message={errors.recipient} />
          )}
        </Field>
        <Field>
          <Label>Amount</Label>
          <InputGroup>
            <Input value={amount} onChange={onChangeAmount} placeholder="0.0" />
            <Symbol>
              {fetchingInfo && <StyledDots />}
              {!fetchingInfo && !data && '--'}
              {!fetchingInfo && data?.token_info.symbol}
            </Symbol>
          </InputGroup>
          {errors?.amount && (
            <MessageWithIcon validation="error" message={errors.amount} />
          )}
        </Field>
        <Field>
          <Label>Memo (optional)</Label>
          <Input
            value={memo}
            onChange={(e) => setMemo(e.currentTarget.value)}
            placeholder="It was mint to be."
          />
        </Field>
        <ButtonWithLoading
          text="Mint"
          isPrimary
          disabled={!enableButton}
          onClick={onMint}
          loading={connecting || gettingAccounts || minting}
        />
      </Wrapper>
    </Card>
  )
}

export default memo(MintCard)
