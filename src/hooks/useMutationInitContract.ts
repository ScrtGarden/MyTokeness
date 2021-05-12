import { useMutation } from 'react-query'

import { instantiateContract } from '../../utils/contractInteractions'

const useMutationInitContract = () => {
  return useMutation(instantiateContract)
}

export default useMutationInitContract
