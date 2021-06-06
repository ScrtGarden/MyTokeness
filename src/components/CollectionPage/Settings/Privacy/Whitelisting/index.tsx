import { FC, memo, useEffect, useReducer, useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import {
  HandleSetWhitelistedApproval,
  ResultInventoryApprovals,
} from '../../../../../../interface/nft'
import {
  ApprovalOptions,
  ApprovalOptionsReducer,
  ExpirationReducer,
  UIExpiration,
  UISnip721Approval,
} from '../../../../../../interface/nft-ui'
import { MAX_GAS } from '../../../../../../utils/constants'
import parseErrorMsg from '../../../../../../utils/parseErrorMsg'
import reducer from '../../../../../../utils/reducer'
import useMutationExeContract from '../../../../../hooks/useMutationExeContract'
import WhitelistSetting from '../../../../Cards/WhitelistSetting'
import {
  formatAdd as format,
  updateTokenApprovals,
  validateAdd as validate,
} from '../lib'

type Props = {
  contractAddress: string
  walletAddress: string
  approvedList: UISnip721Approval[]
}

const OPTIONS: ApprovalOptions = {
  hideOwnership: true,
  hidePrivateMetadata: true,
  preventTransferPower: true,
}

const EXPIRATION: UIExpiration = {
  type: 'never',
  date: new Date(),
  blockheight: '',
}

const Whitelisting: FC<Props> = (props) => {
  const { contractAddress, walletAddress, approvedList } = props
  const queryClient = useQueryClient()

  // component state
  const [address, setAddress] = useState('')
  const [options, setOptions] = useReducer<ApprovalOptionsReducer>(
    reducer,
    OPTIONS
  )
  const [expiration, setExpiration] = useReducer<ExpirationReducer>(
    reducer,
    EXPIRATION
  )
  const [addError, setAddError] = useState({ address: '', expiration: '' })

  // custom hooks
  const { mutate, isLoading } =
    useMutationExeContract<HandleSetWhitelistedApproval>()

  // lifecycle
  useEffect(() => {
    if (addError.address) {
      setAddError({ ...addError, address: '' })
    }
  }, [address])

  useEffect(() => {
    if (addError.expiration) {
      setAddError({ ...addError, expiration: '' })
    }
  }, [expiration])

  const onAdd = () => {
    const { hasError, errors } = validate(address, options, expiration)

    setAddError(errors)

    if (hasError) {
      return
    }

    const handleMsg = format(address, options, expiration)

    mutate(
      {
        contractAddress,
        handleMsg,
        maxGas: MAX_GAS.NFT.SET_WHITELIST_APPROVAL,
      },
      {
        onSuccess: (_, { handleMsg: { set_whitelisted_approval } }) => {
          const key = ['inventoryApprovals', walletAddress, contractAddress]
          const original =
            queryClient.getQueryData<ResultInventoryApprovals>(key)

          if (original) {
            const { inventory_approvals } = original.inventory_approvals
            const updatedApprovals = updateTokenApprovals(
              inventory_approvals,
              set_whitelisted_approval
            )

            queryClient.setQueryData<ResultInventoryApprovals>(key, {
              inventory_approvals: {
                ...original.inventory_approvals,
                inventory_approvals: updatedApprovals,
              },
            })
          }

          setAddress('')
          setOptions(OPTIONS)
          setExpiration(EXPIRATION)
          toast.success('Added address to whitelist.')
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  return (
    <WhitelistSetting
      list={approvedList}
      address={address}
      setAddress={setAddress}
      options={options}
      setOptions={setOptions}
      expiration={expiration}
      setExpiration={setExpiration}
      onAdd={onAdd}
      errors={addError}
      loading={isLoading}
    />
  )
}

export default memo(Whitelisting)
