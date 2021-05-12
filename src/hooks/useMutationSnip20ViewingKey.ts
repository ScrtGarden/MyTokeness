import { useMutation } from 'react-query'

import keplr from '../../utils/keplr'

const useMutationSnip20ViewingKey = () =>
  useMutation((contractAddress: string) =>
    keplr.getSnip20ViewingKey(contractAddress)
  )

export default useMutationSnip20ViewingKey
