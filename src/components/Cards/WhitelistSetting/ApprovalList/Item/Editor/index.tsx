import { useRouter } from 'next/router'
import { FC, memo, useEffect, useReducer, useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import {
  HandleSetWhitelistedApproval,
  ResultInventoryApprovals,
} from '../../../../../../../interface/nft'
import {
  ApprovalOptions,
  ApprovalOptionsReducer,
  ExpirationReducer,
  UIExpiration,
} from '../../../../../../../interface/nft-ui'
import { MAX_GAS } from '../../../../../../../utils/constants'
import parseErrorMsg from '../../../../../../../utils/parseErrorMsg'
import reducer from '../../../../../../../utils/reducer'
import { useStoreState } from '../../../../../../hooks/storeHooks'
import useMutationExeContract from '../../../../../../hooks/useMutationExeContract'
import {
  formatAdd,
  updateTokenApprovals,
} from '../../../../../CollectionPage/Settings/Privacy/lib'
import ButtonWithLoading from '../../../../../Common/ButtonWithLoading'
import { CollectionRouterQuery } from '../../../../../Layouts/CollectionLayout'
import { Button } from '../../../../../UI/Buttons'
import Permissions from '../../../Permissions'
import { validate } from './lib'
import { Buttons, Cell, Content, Wrapper } from './styles'

type Props = {
  address: string
  options: ApprovalOptions
  expiration: UIExpiration
  toggle: () => void
}

const Editor: FC<Props> = (props) => {
  const { expiration, options, toggle, address } = props
  const queryClient = useQueryClient()
  const router = useRouter()
  const { contractAddress } = router.query as CollectionRouterQuery

  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // component state
  const [localOptions, setLocalOptions] = useReducer<ApprovalOptionsReducer>(
    reducer,
    options
  )
  const [localExpiration, setLocalExpiration] = useReducer<ExpirationReducer>(
    reducer,
    expiration
  )
  const [isUpdate, setIsUpdate] = useState<boolean | undefined>(false)
  const [error, setError] = useState('')

  // custom hooks
  const { mutate, isLoading } =
    useMutationExeContract<HandleSetWhitelistedApproval>()

  // lifecycle
  useEffect(() => {
    setLocalOptions(options)
  }, [options])

  useEffect(() => {
    setLocalExpiration(expiration)
  }, [expiration])

  const onClick = (update?: boolean) => {
    setIsUpdate(update)

    const { errors, hasError } = validate(localOptions, localExpiration)

    setError(errors.expiration)

    if (hasError) {
      return
    }

    const handleMsg: HandleSetWhitelistedApproval = update
      ? formatAdd(address, localOptions, localExpiration)
      : {
          set_whitelisted_approval: {
            address,
            view_owner: 'none',
            view_private_metadata: 'none',
            transfer: 'none',
          },
        }

    mutate(
      {
        contractAddress,
        maxGas: MAX_GAS.NFT.SET_WHITELIST_APPROVAL,
        handleMsg,
      },
      {
        onSuccess: (_, { handleMsg: { set_whitelisted_approval } }) => {
          const key = ['inventoryApprovals', walletAddress, contractAddress]
          const original =
            queryClient.getQueryData<ResultInventoryApprovals>(key)

          if (original) {
            const { inventory_approvals } = original.inventory_approvals
            const updatedApprovals = updateTokenApprovals(
              inventory_approvals,
              set_whitelisted_approval
            )

            queryClient.setQueryData<ResultInventoryApprovals>(key, {
              inventory_approvals: {
                ...original.inventory_approvals,
                inventory_approvals: updatedApprovals,
              },
            })
          }

          toggle()
          toast.success(
            update ? 'Updated whitelist.' : 'Removed address from list.'
          )
        },
        onError: (error) => {
          toast.error(parseErrorMsg(error))
        },
      }
    )
  }

  return (
    <Cell colSpan={4}>
      <Content>
        <Permissions
          id="update"
          options={localOptions}
          expiration={localExpiration}
          setOptions={setLocalOptions}
          setExpiration={setLocalExpiration}
          error={error}
        />
        <Buttons>
          <ButtonWithLoading
            width={79}
            text="Remove"
            isDanger
            loading={isLoading && !isUpdate}
            onClick={() => onClick()}
          />
          <Wrapper>
            <Button onClick={toggle}>Cancel</Button>
            <ButtonWithLoading
              text="Save"
              isPrimary
              width={56}
              loading={isLoading && isUpdate}
              onClick={() => onClick(true)}
            />
          </Wrapper>
        </Buttons>
      </Content>
    </Cell>
  )
}

export default memo(Editor)
