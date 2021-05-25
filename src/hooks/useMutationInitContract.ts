import { UseMutationResult, useMutation, useQueryClient } from 'react-query'
import { InstantiateResult } from 'secretjs'

import { Params, instantiateContract } from '../../utils/contractInteractions'
import { useStoreState } from './storeHooks'

const useMutationInitContract = <T extends object>(): UseMutationResult<
  InstantiateResult,
  Error,
  Params<T>
> => {
  const queryClient = useQueryClient()
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  return useMutation((data) => instantiateContract(data), {
    onSettled: () =>
      queryClient.invalidateQueries(['nativeBalance', walletAddress]),
  })
}

export default useMutationInitContract
