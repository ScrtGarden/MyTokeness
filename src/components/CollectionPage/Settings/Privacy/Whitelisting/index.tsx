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
import {
  formatWhitelistAdd as format,
  validateWhitelistAdd as validate,
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
  type: '',
  date: new Date(),
  blockheight: '',
}

const Whitelisting: FC<Props> = (props) => {
  const { contractAddress, walletAddress, approvedList } = props

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
  const [addError, setAddError] = useState({
    address: '',
    option: '',
    value: '',
  })

  // custom hooks
  const { mutate, isLoading } = useMutationWhitelist(
    walletAddress,
    contractAddress
  )

  // lifecycle
  useEffect(() => {
    if (addError.address) {
      setAddError({ ...addError, address: '' })
    }
  }, [address])

  useEffect(() => {
    if (addError.option || addError.value) {
      setAddError({ ...addError, option: '', value: '' })
    }
  }, [expiration])

  const onWhitelistAdd = () => {
    const { hasError, errors } = validate(address, options, expiration)

    setAddError(errors)

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
      errors={addError}
      loading={isLoading}
    />
  )
}

export default memo(Whitelisting)
