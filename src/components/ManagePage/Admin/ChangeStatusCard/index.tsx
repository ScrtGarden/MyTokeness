import { FC, memo, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  HandleMsgSetContractStatus,
  QueryContractStatus,
  ResultContractStatus,
} from '../../../../../interface/snip20'
import { MAX_GAS } from '../../../../../utils/constants'
import parseErrorMsg from '../../../../../utils/parseErrorMsg'
import { useStoreState } from '../../../../hooks/storeHooks'
import useMutationConnectWallet from '../../../../hooks/useMutationConnectWallet'
import useMutationExeContract from '../../../../hooks/useMutationExeContract'
import useMutationGetAccounts from '../../../../hooks/useMutationGetAccounts'
import useQueryContract from '../../../../hooks/useQueryContract'
import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Option, Select } from '../../../UI/Forms'

const OPTIONS = {
  normal_run: 'Active',
  stop_all_but_redeems: 'Only redeems',
  stop_all: 'Inactive',
}

type Options = keyof typeof OPTIONS | ''

type Props = {
  contractAddress: string
  enableButton?: boolean
}

const ChangeStatusCard: FC<Props> = ({ contractAddress, enableButton }) => {
  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // custom hooks
  const { mutateAsync: connect, isLoading: connecting } =
    useMutationConnectWallet()
  const { mutateAsync: getAccounts, isLoading: gettingAccounts } =
    useMutationGetAccounts()
  const { mutate, isLoading: updating } =
    useMutationExeContract<HandleMsgSetContractStatus>()

  const { data, isError } = useQueryContract<
    QueryContractStatus,
    ResultContractStatus
  >(
    ['contractStatus', contractAddress],
    contractAddress,
    { contract_status: {} },
    { enabled: !!contractAddress, refetchOnWindowFocus: false, retry: false }
  )

  // component state
  const [status, setStatus] = useState<Options>(
    data?.contract_status.status || ''
  )
  const [error, setError] = useState('')

  // lifecycle
  useEffect(() => {
    setError('')
  }, [status])

  useEffect(() => {
    data && setStatus(data.contract_status.status)
  }, [data])

  useEffect(() => {
    !contractAddress && setStatus('')
  }, [contractAddress])

  const onUpdate = async () => {
    if (!status) {
      setError('Please select a valid status.')
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
        maxGas: MAX_GAS.SNIP20.SET_CONTRACT_STATUS,
        handleMsg: { set_contract_status: { level: status } },
      },
      {
        onSuccess: () => {
          toast.success('Updated contract status.')
          setStatus('')
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  return (
    <Card>
      <Header>Change contract status</Header>
      <Wrapper>
        <Select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.currentTarget.value as Options)}
          disabled={!enableButton}
        >
          <Option disabled value={''}>
            Select an option
          </Option>
          {Object.entries(OPTIONS).map(([key, value]) => (
            <Option key={key} value={key}>
              {value}
            </Option>
          ))}
        </Select>
        <ButtonWithLoading
          isPrimary
          text="Update"
          disabled={!enableButton}
          onClick={onUpdate}
          loading={connecting || gettingAccounts || updating}
        />
      </Wrapper>
    </Card>
  )
}

export default memo(ChangeStatusCard)
