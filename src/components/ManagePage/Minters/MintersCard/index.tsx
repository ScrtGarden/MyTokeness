import { FC, memo, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import {
  HandleMsgSetMinters,
  QueryMinters,
  ResultMinters,
  ResultTokenConfig,
} from '../../../../../interface/snip20'
import { MAX_GAS } from '../../../../../utils/constants'
import isSecretAddress from '../../../../../utils/isSecretAddress'
import parseErrorMsg from '../../../../../utils/parseErrorMsg'
import { useStoreState } from '../../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../../hooks/useMutationConnectWallet'
import useMutationExeContract from '../../../../hooks/useMutationExeContract'
import useMutationGetAccounts from '../../../../hooks/useMutationGetAccounts'
import useQueryContract from '../../../../hooks/useQueryContract'
import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import { IconButton, StyledIcon } from '../../../UI/Buttons'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Input } from '../../../UI/Forms'
import { Text } from '../../../UI/Typography'
import { AddBar, Field } from './styles'

type Props = {
  contractAddress: string
}

const MintersCard: FC<Props> = ({ contractAddress }) => {
  const queryClient = useQueryClient()
  const tokenConfig = queryClient.getQueryData<ResultTokenConfig>([
    'tokenConfig',
    contractAddress,
  ])

  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // custom hooks
  const { mutateAsync: connect, isLoading: connecting } =
    useMutationConnectWallet()
  const { mutateAsync: getAccounts, isLoading: gettingAccounts } =
    useMutationGetAccounts()
  const { mutate, isLoading: updating } =
    useMutationExeContract<HandleMsgSetMinters>()
  const { data, isLoading, error } = useQueryContract<
    QueryMinters,
    ResultMinters
  >(
    ['minters', contractAddress],
    contractAddress,
    { minters: {} },
    { enabled: !!contractAddress, refetchOnWindowFocus: false }
  )

  // component state
  const [minters, setMinters] = useState<string[]>([])
  const [address, setAddress] = useState('')
  const [addError, setAddError] = useState('')
  const enableButton = useMemo(
    () => tokenConfig && tokenConfig.token_config.mint_enabled,
    [tokenConfig]
  )

  // lifecycle
  useEffect(() => {
    if (data) {
      setMinters(data.minters.minters)
    } else {
      setMinters([])
    }
  }, [data])

  useEffect(() => {
    if (addError) {
      setAddError('')
    }
  }, [address])

  const onAdd = () => {
    if (!address || !isSecretAddress(address)) {
      setAddError('Please enter a valid address.')
    } else if (minters.some((addy) => addy === address)) {
      setAddError('Address is already listed.')
    } else {
      setMinters(minters.concat([address]))
      setAddress('')
    }
  }

  const onMinus = (selectedAddy: string) => {
    setMinters(minters.filter((addy) => addy !== selectedAddy))
  }

  const onUpdate = async () => {
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
        maxGas: MAX_GAS.SNIP20.SET_MINTERS,
        handleMsg: { set_minters: { minters } },
      },
      {
        onSuccess: () => {
          toast.success('Updated minters.')
          queryClient.setQueryData<ResultMinters>(
            ['minters', contractAddress],
            { minters: { minters } }
          )
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  return (
    <Card>
      <Header>Edit Minters</Header>
      <Wrapper>
        {minters.length === 0 ? (
          <Text>Add an address to get started.</Text>
        ) : (
          minters.map((address) => (
            <Field key={address}>
              <Text>{address}</Text>
              <IconButton onClick={() => onMinus(address)}>
                <StyledIcon name="minus" />
              </IconButton>
            </Field>
          ))
        )}
        <AddBar>
          <Field>
            <Input
              placeholder="secret1gvjcte2asddt09394s3r2aqhllgchg4608fmew"
              value={address}
              onChange={(e) => setAddress(e.currentTarget.value)}
            />
            <IconButton onClick={onAdd}>
              <StyledIcon name="plus" />
            </IconButton>
          </Field>
          {addError && (
            <MessageWithIcon validation="error" message={addError} />
          )}
        </AddBar>
        <ButtonWithLoading
          text="Update"
          isPrimary
          disabled={!enableButton}
          onClick={onUpdate}
          loading={connecting || gettingAccounts || updating}
        />
      </Wrapper>
    </Card>
  )
}

export default memo(MintersCard)
