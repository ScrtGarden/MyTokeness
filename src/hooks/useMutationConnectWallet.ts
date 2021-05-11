import { useMutation } from 'react-query'

import keplr from '../../utils/keplr'

const useMutationConnectWallet = () => {
  return useMutation(keplr.connect)
}

export default useMutationConnectWallet
