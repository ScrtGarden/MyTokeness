import { useRouter } from 'next/router'

import {
  QueryInventoryApprovals,
  ResultInventoryApprovals,
} from '../../../../../interface/nft'
import { UIInventoryApprovals } from '../../../../../interface/nft-ui'
import { inventoryApprovalToUI } from '../../../../../utils/dataParser'
import { useStoreState } from '../../../../hooks/storeHooks'
import useQueryContract from '../../../../hooks/useQueryContract'
import { CollectionRouterQuery } from '../../../Layouts/CollectionLayout'
import { Container } from '../styles'
import OwnershipPrivacySetting from './OwnershipPrivacySetting'
import PrivateMetadataPrivacySetting from './PrivateMetadataPrivacySetting'
import Whitelisting from './Whitelisting'

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
    ResultInventoryApprovals,
    UIInventoryApprovals
  >(
    ['inventoryApprovals', walletAddress, contractAddress],
    contractAddress,
    {
      inventory_approvals: { address: walletAddress, viewing_key: viewingKey },
    },
    {
      enabled: !!viewingKey,
      select: inventoryApprovalToUI,
      refetchOnWindowFocus: false,
    }
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
      <OwnershipPrivacySetting
        isPrivate={!data.ownerIsPublic}
        expiration={data.publicOwnershipExpiration}
        contractAddress={contractAddress}
        walletAddress={walletAddress}
      />
      <PrivateMetadataPrivacySetting
        isPrivate={!data.privateMetadataIsPublic}
        expiration={data.privateMetadataIsPublicExpiration}
        contractAddress={contractAddress}
        walletAddress={walletAddress}
      />
      <Whitelisting
        contractAddress={contractAddress}
        walletAddress={walletAddress}
        approvedList={data.inventoryApprovals}
      />
    </Container>
  )
}

export default Privacy
