import { fromUnixTime } from 'date-fns'

import {
  Expiration,
  ResultInventoryApprovals,
  Snip721Approval,
} from '../interface/nft'
import {
  UIExpiration,
  UIInventoryApprovals,
  UISnip721Approval,
} from '../interface/nft-ui'

const expirationToUI = (
  original: Expiration | null | undefined
): UIExpiration => {
  const initial: UIExpiration = {
    type: 'never',
    date: new Date(),
    blockheight: '',
  }

  if (original === null || !original) {
    return initial
  } else if (original === 'never') {
    return { ...initial, type: 'never' }
  } else if ('at_time' in original) {
    return { ...initial, type: 'date', date: fromUnixTime(original.at_time) }
  } else {
    return {
      ...initial,
      type: 'blockheight',
      blockheight: String(original.at_height),
    }
  }
}

const Snip721ApprovalToUI = (original: Snip721Approval): UISnip721Approval => {
  const {
    address,
    transfer_expiration,
    view_owner_expiration,
    view_private_metadata_expiration,
  } = original

  return {
    address,
    transferExpiration: expirationToUI(transfer_expiration),
    viewOwnerExpiration: expirationToUI(view_owner_expiration),
    viewPrivateMetadataExpiration: expirationToUI(
      view_private_metadata_expiration
    ),
  }
}

const inventoryApprovalToUI = (
  original: ResultInventoryApprovals
): UIInventoryApprovals => {
  const {
    inventory_approvals,
    public_ownership_expiration,
    private_metadata_is_public_expiration,
    private_metadata_is_public,
    owner_is_public,
  } = original.inventory_approvals

  const publicOwnershipExpiration = expirationToUI(public_ownership_expiration)
  const privateMetadataIsPublicExpiration = expirationToUI(
    private_metadata_is_public_expiration
  )
  const inventoryApprovals = inventory_approvals.map((approved) =>
    Snip721ApprovalToUI(approved)
  )

  return {
    inventoryApprovals,
    ownerIsPublic: owner_is_public,
    privateMetadataIsPublicExpiration,
    publicOwnershipExpiration,
    privateMetadataIsPublic: private_metadata_is_public,
  }
}

export { inventoryApprovalToUI, Snip721ApprovalToUI, expirationToUI }
