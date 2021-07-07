import { FC, FormEvent, memo, useState } from 'react'
import { toast } from 'react-toastify'

import encryptMsg from '../../../../utils/encryptMsg'
import keplr from '../../../../utils/keplr'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import { amountPattern } from '../../../../utils/regexPatterns'
import TOKENS from '../../../../utils/tokens'
import toSmallestDenomination from '../../../../utils/toSmallestDenomination'
import { useStoreState } from '../../../hooks/storeHooks'
import useToggle from '../../../hooks/useToggle'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import MessageWithIcon from '../../Common/MessageWithIcon'
import Icon from '../../Icons'
import { Button } from '../../UI/Buttons'
import {
  Field,
  Input,
  InputGroup,
  Label,
  StyledSelect,
  Symbol,
} from '../../UI/Forms'
import { Buttons, CloseButton, Header, Title } from '../../UI/Modal'
import { Text } from '../../UI/Typography'
import { validate } from './lib'
import { StyledContent } from './styles'
import ThankYou from './ThankYou'

const tokens =
  TOKENS[process.env.NEXT_PUBLIC_IS_MAINNET === 'false' ? 'TESTNET' : 'MAINNET']

const OPTIONS = Object.entries(tokens).map(([key, value]) => ({
  value: key,
  label: value.symbol,
}))

type Props = {
  toggle: () => void
}

const Donation: FC<Props> = ({ toggle }) => {
  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // component state
  const [selected, setSelected] = useState<Record<string, string> | null>(null)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({
    token: '',
    amount: '',
  })
  const [showSuccess, toggleSuccess] = useToggle()

  const onSelect = (option: Record<string, string>) => {
    if (errors.token) {
      setErrors({ ...errors, token: '' })
    }
    setAmount('')
    setSelected(option)
  }

  const onChangeAmount = (e: FormEvent<HTMLInputElement>) => {
    if (errors.amount) {
      setErrors({ ...errors, amount: '' })
    }
    const value = e.currentTarget.value
    const decimals = tokens[!!selected ? selected.value : ''].decimals
    if (!value || value.match(amountPattern(decimals))) {
      setAmount(value)
    }
  }

  const onClickDonate = async () => {
    const { hasError, errors } = validate(selected, amount)

    if (hasError) {
      setErrors(errors)
      return
    }

    setLoading(true)

    try {
      if (selected) {
        if (selected.value === 'native') {
          await sendNative()
        } else {
          await sendToken(selected.value)
        }
      }
      toggleSuccess()
    } catch (error) {
      toast.error(parseErrorMsg(error))
    }

    setLoading(false)
  }

  const sendNative = async () => {
    const amountInSmallestDenom = toSmallestDenomination(amount, 6)
    try {
      const signingClient = await keplr.createSigningClient()
      return await signingClient.sendTokens(
        process.env.NEXT_PUBLIC_MYTOKENESS_WALLET_ADDRESS as string,
        [
          {
            denom: 'uscrt',
            amount: amountInSmallestDenom,
          },
        ]
      )
    } catch (error) {
      return error
    }
  }

  const sendToken = async (contractAddress: string) => {
    const amountInSmallestDenom = toSmallestDenomination(
      amount,
      tokens[contractAddress].decimals
    )
    const msg = {
      transfer: {
        recipient: process.env.NEXT_PUBLIC_MYTOKENESS_WALLET_ADDRESS,
        amount: amountInSmallestDenom,
      },
    }
    const fee = {
      amount: [
        {
          amount: '50000',
          denom: 'uscrt',
        },
      ],
      gas: '270000',
    }

    try {
      const signingClient = await keplr.createSigningClient()
      const codeHash = await signingClient.getCodeHashByContractAddr(
        contractAddress
      )
      const encrypted = await encryptMsg(msg, codeHash)
      const sendMsg = {
        type: 'wasm/MsgExecuteContract',
        value: {
          sender: walletAddress,
          contract: contractAddress,
          callback_code_hash: '',
          sent_funds: [],
          callback_sig: null,
          msg: encrypted,
        },
      }
      const { accountNumber, sequence } = await signingClient.getNonce(
        walletAddress
      )
      const signedTx = await signingClient.signAdapter(
        [sendMsg],
        fee,
        process.env.NEXT_PUBLIC_CHAIN_ID as string,
        '',
        accountNumber,
        sequence
      )
      return await signingClient.postTx(signedTx)
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Header>
        <Title>Give some love!</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      {!showSuccess ? (
        <>
          <StyledContent spaced>
            <Text>
              If you would like to further support my work, please consider
              making a small donation. All good if you don&apos;t, I&apos;m just
              glad you visited.
            </Text>
            <Field>
              <Label>Token</Label>
              <StyledSelect
                classNamePrefix="select"
                options={OPTIONS}
                value={selected}
                onChange={onSelect}
              />
              {errors.token && (
                <MessageWithIcon validation="error" message={errors.token} />
              )}
            </Field>
            <Field>
              <Label>Amount</Label>
              <InputGroup>
                <Input
                  value={amount}
                  onChange={onChangeAmount}
                  placeholder="0.0"
                  disabled={!selected}
                />
                <Symbol>
                  {!selected && '--'}
                  {selected && selected.label}
                </Symbol>
              </InputGroup>
              {errors.amount && (
                <MessageWithIcon validation="error" message={errors.amount} />
              )}
            </Field>
          </StyledContent>
          <Buttons>
            <Button onClick={toggle}>Cancel</Button>
            <ButtonWithLoading
              text="Donate"
              isPrimary
              width={74}
              loading={loading}
              onClick={onClickDonate}
            />
          </Buttons>
        </>
      ) : (
        <ThankYou />
      )}
    </>
  )
}

export default memo(Donation)
