import { useQuery } from 'react-query'

import { ResultNFTDossier } from '../../interface/nft'
import { queryChain } from '../../utils/secretjs'

const useQueryNFTDossier = (
  contractAddress: string,
  id: string,
  walletAddress?: string,
  viewingKey?: string
) => {
  return useQuery<ResultNFTDossier, Error, ReturnType<typeof formatNFTDossier>>(
    ['nftDossier', contractAddress, id],
    () =>
      queryChain.queryContractSmart(contractAddress, {
        nft_dossier: {
          token_id: id,
          ...(!!walletAddress && {
            viewer: { address: walletAddress, viewing_key: viewingKey },
          }),
          include_expired: false,
        },
      }),
    { refetchOnWindowFocus: false, select: formatNFTDossier }
  )
}

const formatNFTDossier = (original: ResultNFTDossier) => {
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
      } = {},
      public_ownership_expiration,
      token_approvals,
    },
  } = original

  const privateMetadata =
    !private_metadata || private_metadata === null
      ? private_metadata
      : {
          attributes: private_metadata.attributes
            ? JSON.parse(private_metadata.attributes)
            : [],
          description: private_metadata.description,
          image: private_metadata.image,
          name: private_metadata.name,
          properties: private_metadata.properties
            ? JSON.parse(private_metadata.properties)
            : {},
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
    inventoryApprovals: inventory_approvals,
    owner,
    ownerIsPublic: owner_is_public,
    privateMetadata,
    privateMetadataIsPublic: private_metadata_is_public,
    privateMetadataIsPublicExpiration: private_metadata_is_public_expiration,
    publicMetadata,
    publicOwnershipExpiration: public_ownership_expiration,
    tokenApprovals: token_approvals,
  }
}

export default useQueryNFTDossier
