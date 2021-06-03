import { useRouter } from 'next/router'

import {
  QueryInventoryApprovals,
  ResultInventoryApprovals,
} from '../../../../../interface/nft'
import { useStoreState } from '../../../../hooks/storeHooks'
import useQueryContract from '../../../../hooks/useQueryContract'
import ApprovalSetting from '../../../Cards/ApprovalSetting'
import { CollectionRouterQuery } from '../../../Layouts/CollectionLayout'
import { Container } from '../styles'

const Privacy = () => {
  const router = useRouter()
  const { contractAddress } = router.query as CollectionRouterQuery

  const walletAddress = useStoreState((state) => state.auth.connectedAddress)
  const viewingKey = useStoreState((state) =>
    state.auth.keyByContractAddress(contractAddress)
  )

  // custom hooks
  const { data, isLoading } = useQueryContract<
    QueryInventoryApprovals,
    ResultInventoryApprovals
  >(
    ['inventoryApprovals', walletAddress, contractAddress],
    contractAddress,
    {
      inventory_approvals: { address: walletAddress, viewing_key: viewingKey },
    },
    { enabled: !!viewingKey }
  )

  console.log({ data })

  if (isLoading) {
    return <Container>Loading...</Container>
  }

  if (!data) {
    return null
  }

  return (
    <Container>
      <ApprovalSetting
        title="Ownership Privacy Setting"
        description="Turning this off will allow anyone see which assets you own."
        isPrivate={!data.inventory_approvals.owner_is_public}
        expiration={data.inventory_approvals.public_ownership_expiration}
        toggleId="ownership"
        toggleLabel="Hide ownership"
      />
      <ApprovalSetting
        title="Private Metadata Privacy Setting"
        description="Turning this off will allow anyone see the private metadata of all your owned assets."
        isPrivate={!data.inventory_approvals.private_metadata_is_public}
        expiration={
          data.inventory_approvals.private_metadata_is_public_expiration
        }
        toggleId="privateMetadata"
        toggleLabel="Hide private metadata"
      />
    </Container>
  )
}

export default Privacy
