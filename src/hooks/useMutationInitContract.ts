import { UseMutationResult, useMutation } from 'react-query'
import { InstantiateResult } from 'secretjs'

import { Params, instantiateContract } from '../../utils/contractInteractions'

const useMutationInitContract = (): UseMutationResult<
  InstantiateResult,
  Error,
  Params
> => useMutation(instantiateContract)

export default useMutationInitContract
