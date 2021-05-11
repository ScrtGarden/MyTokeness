import { useMutation } from 'react-query'

import keplr from '../../utils/keplr'
import { useStoreActions } from './storeHooks'

const useMutationGetAccounts = () => {
  // store actions
  const setStoreAccounts = useStoreActions(
    (actions) => actions.auth.setAccounts
  )

  return useMutation(keplr.getAccounts, {
    onSuccess: ({ accounts }) => {
      setStoreAccounts(accounts)
    },
    onError: () => {
      setStoreAccounts([])
    },
  })
}

export default useMutationGetAccounts
