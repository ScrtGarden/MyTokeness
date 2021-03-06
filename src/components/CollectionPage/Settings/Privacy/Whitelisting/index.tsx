import { FC, memo, useEffect, useReducer, useState } from 'react'
import { toast } from 'react-toastify'

import {
  ApprovalOptions,
  ApprovalOptionsReducer,
  ExpirationReducer,
  UIExpiration,
  UISnip721Approval,
} from '../../../../../../interface/nft-ui'
import parseErrorMsg from '../../../../../../utils/parseErrorMsg'
import reducer from '../../../../../../utils/reducer'
import useMutationWhitelist from '../../../../../hooks/useMutationWhitelist'
import WhitelistSetting from '../../../../Cards/WhitelistSetting'
import { Errors } from '../../../../Cards/WhitelistSetting/AddNew'
import {
  formatWhitelistAdd as format,
  validateWhitelistAdd as validate,
} from '../lib'

type ErrorsReducer = (p: Errors, u: Partial<Errors>) => Errors
type Props = {
  contractAddress: string
  walletAddress: string
  approvedList: UISnip721Approval[]
  viewingKey: string
}

const OPTIONS: ApprovalOptions = {
  hideOwnership: true,
  hidePrivateMetadata: true,
  preventTransferPower: true,
}

const EXPIRATION: UIExpiration = {
  type: '',
  date: new Date(),
  blockheight: '',
}

const ERRORS: Errors = {
  address: '',
  option: '',
  value: '',
}

const Whitelisting: FC<Props> = (props) => {
  const { contractAddress, walletAddress, approvedList, viewingKey } = props

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
  const [addErrors, setAddErrors] = useReducer<ErrorsReducer>(reducer, ERRORS)

  // custom hooks
  const { mutate, isLoading } = useMutationWhitelist(
    { walletAddress, viewingKey },
    contractAddress
  )

  // lifecycle
  useEffect(() => {
    setAddErrors({ address: '' })
  }, [address])

  useEffect(() => {
    setAddErrors({ option: '', value: '' })
  }, [expiration])

  const onWhitelistAdd = () => {
    const { hasError, errors } = validate(address, options, expiration)

    setAddErrors(errors)

    if (hasError) {
      return
    }

    const data = format(address, options, expiration)

    mutate(data, {
      onSuccess: () => {
        setAddress('')
        setOptions(OPTIONS)
        setExpiration(EXPIRATION)
        toast.success('Updated whitelist privacy settings.')
      },
      onError: (error) => {
        toast.error(parseErrorMsg(error))
      },
    })
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
      onAdd={onWhitelistAdd}
      errors={addErrors}
      loading={isLoading}
    />
  )
}

export default memo(Whitelisting)
