import { useRouter } from 'next/router'

import {
  QueryInventoryApprovals,
  ResultInventoryApprovals,
} from '../../../../../interface/nft'
import { UIInventoryApprovals } from '../../../../../interface/nft-ui'
import { inventoryApprovalToUI } from '../../../../../utils/dataParser'
import { useStoreState } from '../../../../hooks/storeHooks'
import useQueryContract from '../../../../hooks/useQueryContract'
import SkeletonCard from '../../../Cards/Skeleton'
import EmptyList from '../../../EmptyList'
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
  const { data, isLoading, isError } = useQueryContract<
    QueryInventoryApprovals,
    ResultInventoryApprovals,
    UIInventoryApprovals
  >(
    ['inventoryApprovals', walletAddress, viewingKey, contractAddress],
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

  if (!viewingKey) {
    return (
      <Container>
        <EmptyList
          text="We need a viewing key to handle your privacy settings. Please make sure you have created one and then come back."
          icon="key-skeleton"
          buttonText="Go Create Viewing Key"
          onClick={() =>
            router.push(
              '/nft/collections/[contractAddress]/settings/viewing-key',
              `/nft/collections/${contractAddress}/settings/viewing-key`,
              { shallow: true }
            )
          }
        />
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Container>
        <SkeletonCard />
        <SkeletonCard />
      </Container>
    )
  }

  if (!data || isError) {
    return (
      <Container>
        <EmptyList
          text="Ooops! Looks like something went wrong."
          icon="exclamation-circle-duo"
        />
      </Container>
    )
  }

  return (
    <Container>
      <OwnershipPrivacySetting
        isPrivate={!data.ownerIsPublic}
        expiration={data.publicOwnershipExpiration}
        contractAddress={contractAddress}
        walletAddress={walletAddress}
        viewingKey={viewingKey}
      />
      <PrivateMetadataPrivacySetting
        isPrivate={!data.privateMetadataIsPublic}
        expiration={data.privateMetadataIsPublicExpiration}
        contractAddress={contractAddress}
        walletAddress={walletAddress}
        viewingKey={viewingKey}
      />
      <Whitelisting
        contractAddress={contractAddress}
        walletAddress={walletAddress}
        approvedList={data.inventoryApprovals}
        viewingKey={viewingKey}
      />
    </Container>
  )
}

export default Privacy
