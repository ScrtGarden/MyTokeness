import { useRouter } from 'next/router'
import { useState } from 'react'

import {
  QueryInventoryApprovals,
  ResultInventoryApprovals,
} from '../../../../../interface/nft'
import { useStoreState } from '../../../../hooks/storeHooks'
import useQueryContract from '../../../../hooks/useQueryContract'
import { CollectionRouterQuery } from '../../../Layouts/CollectionLayout'
import { Container } from '../styles'
import OwnershipPrivacySetting from './OwnershipPrivacySetting'
import PrivateMetadataPrivacySetting from './PrivateMetadataPrivacySetting'

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

  // console.log({ data })

  if (isLoading) {
    return <Container>Loading...</Container>
  }

  if (!data) {
    return null
  }

  return (
    <Container>
      <OwnershipPrivacySetting
        isPrivate={!data.inventory_approvals.owner_is_public}
        expiration={data.inventory_approvals.public_ownership_expiration}
        contractAddress={contractAddress}
        walletAddress={walletAddress}
      />
      <PrivateMetadataPrivacySetting
        isPrivate={!data.inventory_approvals.private_metadata_is_public}
        expiration={
          data.inventory_approvals.private_metadata_is_public_expiration
        }
        contractAddress={contractAddress}
        walletAddress={walletAddress}
      />
    </Container>
  )
}

export default Privacy
