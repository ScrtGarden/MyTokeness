import { FC, memo } from 'react'

import { Snip721Approval } from '../../../../../../interface/nft'
import WhitelistSetting from '../../../../Cards/WhitelistSetting'

type Props = {
  contractAddress: string
  walletAddress: string
  approvedList: Snip721Approval[]
}

const Whitelisting: FC<Props> = ({
  contractAddress,
  walletAddress,
  approvedList,
}) => {
  return <WhitelistSetting list={approvedList} />
}

export default memo(Whitelisting)
