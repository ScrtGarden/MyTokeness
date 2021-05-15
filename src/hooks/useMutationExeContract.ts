import { useMutation } from 'react-query'
import { ExecuteResult } from 'secretjs'

import {
  ExecuteContractParams,
  executeContract,
} from '../../utils/contractInteractions'

const useMutationExeContract = <T extends object>() => {
  return useMutation<ExecuteResult, Error, ExecuteContractParams<T>, unknown>(
    (params: ExecuteContractParams<T>) => executeContract(params)
  )
}

export default useMutationExeContract
