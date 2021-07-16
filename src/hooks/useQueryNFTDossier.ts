import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'

import { ResultNFTDossier } from '../../interface/nft'
import { UINFTDossier, UserInfo } from '../../interface/nft-ui'
import { Snip721ApprovalToUI, expirationToUI } from '../../utils/dataParser'
import { queryChain } from '../../utils/secretjs'

const nftDossierQueryKey = (
  contractAddress: string,
  id: string,
  viewerInfo?: UserInfo
): string[] => [
  'nftDossier',
  contractAddress,
  id,
  ...(!!viewerInfo ? [viewerInfo.walletAddress, viewerInfo.viewingKey] : []),
]

const useQueryNFTDossier = (
  contractAddress: string,
  id: string,
  viewerInfo?: UserInfo,
  options?: UseQueryOptions<ResultNFTDossier, Error, UINFTDossier>
): UseQueryResult<UINFTDossier, Error> =>
  useQuery(
    nftDossierQueryKey(
      contractAddress,
      id,
      !!viewerInfo ? { ...viewerInfo } : undefined
    ),
    () =>
      queryChain.queryContractSmart(contractAddress, {
        nft_dossier: {
          token_id: id,
          ...(!!viewerInfo && {
            viewer: {
              address: viewerInfo.walletAddress,
              viewing_key: viewerInfo.viewingKey,
            },
          }),
        },
      }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      select: formatNFTDossier,
      ...options,
    }
  )

const formatNFTDossier = (original: ResultNFTDossier): UINFTDossier => {
  const {
    nft_dossier: {
      display_private_metadata_error,
      inventory_approvals,
      owner,
      owner_is_public,
      private_metadata,
      private_metadata_is_public,
      private_metadata_is_public_expiration,
      public_metadata: {
        attributes: pubAttrs,
        description: pubDesc,
        image: pubImg,
        name: pubName,
        properties: pubProps,
      },
      public_ownership_expiration,
      token_approvals,
    },
  } = original

  const privateMetadata = !private_metadata
    ? null
    : {
        image: private_metadata.image,
        properties: private_metadata.properties
          ? JSON.parse(private_metadata.properties)
          : { content: '' },
      }

  const publicMetadata = {
    attributes: pubAttrs ? JSON.parse(pubAttrs) : [],
    description: pubDesc,
    image: pubImg,
    name: pubName,
    properties: pubProps ? JSON.parse(pubProps) : {},
  }

  return {
    displayPrivateMetadataError: display_private_metadata_error,
    owner,
    ownerIsPublic: owner_is_public,
    privateMetadata,
    privateMetadataIsPublic: private_metadata_is_public,
    privateMetadataIsPublicExpiration: expirationToUI(
      private_metadata_is_public_expiration
    ),
    publicMetadata,
    publicOwnershipExpiration: expirationToUI(public_ownership_expiration),
    inventoryApprovals: inventory_approvals
      ? inventory_approvals.map((item) => Snip721ApprovalToUI(item))
      : [],
    tokenApprovals: token_approvals
      ? token_approvals.map((item) => Snip721ApprovalToUI(item))
      : [],
    isSealed: display_private_metadata_error
      ? display_private_metadata_error?.includes(
          'Sealed metadata must be unwrapped'
        ) ||
        display_private_metadata_error?.includes(
          'You are not authorized to perform this action'
        )
      : false,
  }
}

export { useQueryNFTDossier as default, nftDossierQueryKey }
