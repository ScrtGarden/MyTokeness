import { FC, memo, useReducer, useState } from 'react'

import { Snip721Approval } from '../../../../../../interface/nft'
import {
  ExpirationReducer,
  UIExpiration,
} from '../../../../../../interface/nft-ui'
import reducer from '../../../../../../utils/reducer'
import WhitelistSetting from '../../../../Cards/WhitelistSetting'
import { Options } from '../../../../Cards/WhitelistSetting/AddNew'

type Props = {
  contractAddress: string
  walletAddress: string
  approvedList: Snip721Approval[]
}

type OptionReducer = (p: Options, u: Partial<Options>) => Options

const OPTIONS: Options = {
  hideOwnership: true,
  hidePrivateMetadata: true,
  preventTransferPower: true,
}

const EXPIRATION: UIExpiration = {
  type: 'never',
  date: new Date(),
  blockheight: '',
}

const Whitelisting: FC<Props> = ({
  contractAddress,
  walletAddress,
  approvedList,
}) => {
  const [address, setAddress] = useState('')
  const [options, setOptions] = useReducer<OptionReducer>(reducer, OPTIONS)
  const [expiration, setExpiration] = useReducer<ExpirationReducer>(
    reducer,
    EXPIRATION
  )

  return (
    <WhitelistSetting
      list={approvedList}
      address={address}
      setAddress={setAddress}
      options={options}
      setOptions={setOptions}
      expiration={expiration}
      setExpiration={setExpiration}
    />
  )
}

export default memo(Whitelisting)
