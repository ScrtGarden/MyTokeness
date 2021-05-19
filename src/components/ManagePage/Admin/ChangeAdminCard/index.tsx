import { FC, memo, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { HandleMsgChangeAdmin } from '../../../../../interface/snip20'
import { MAX_GAS } from '../../../../../utils/constants'
import isSecretAddress from '../../../../../utils/isSecretAddress'
import parseErrorMsg from '../../../../../utils/parseErrorMsg'
import { useStoreState } from '../../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../../hooks/useMutationConnectWallet'
import useMutationExeContract from '../../../../hooks/useMutationExeContract'
import useMutationGetAccounts from '../../../../hooks/useMutationGetAccounts'
import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Field, Input, Label } from '../../../UI/Forms'

type Props = {
  contractAddress: string
  enableButton?: boolean
}

const ChangeAdminCard: FC<Props> = ({ contractAddress, enableButton }) => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // custom hooks
  const { mutateAsync: connect, isLoading: connecting } =
    useMutationConnectWallet()
  const { mutateAsync: getAccounts, isLoading: gettingAccounts } =
    useMutationGetAccounts()
  const { mutate, isLoading: updating } =
    useMutationExeContract<HandleMsgChangeAdmin>()

  // component state
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  // lifecycle
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [address])

  const onUpdate = async () => {
    if (!address || !isSecretAddress(address)) {
      setError('Please enter a valid address.')
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

    mutate(
      {
        contractAddress,
        maxGas: MAX_GAS.SNIP20.CHANGE_ADMIN,
        handleMsg: { change_admin: { address } },
      },
      {
        onSuccess: () => {
          toast.success('Updated admin address.')
          setAddress('')
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  return (
    <Card>
      <Header>Change Admin</Header>
      <Wrapper>
        <Field>
          <Label>Wallet Address</Label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            placeholder="secret1gvjcte2asddt09394s3r2aqhllgchg4608fmew"
          />
          {error && <MessageWithIcon validation="error" message={error} />}
        </Field>
        <ButtonWithLoading
          text="Update"
          isPrimary
          onClick={onUpdate}
          loading={connecting || gettingAccounts || updating}
          disabled={!enableButton}
        />
      </Wrapper>
    </Card>
  )
}

export default memo(ChangeAdminCard)
