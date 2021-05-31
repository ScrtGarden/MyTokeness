import cryptoRandomString from 'crypto-random-string'

import { HandleBatchMintNFT, HandleMintNFT } from '../../../../interface/nft'
import {
  Attribute,
  PrivateMetadata,
  PublicMetadata,
} from '../../CreateNFTPage/Store/model'

interface FormatForHandleMsgParams {
  publicMetadata: PublicMetadata
  publicFileLink: string
  privateMetadata: PrivateMetadata
  privateFileLink: string
}

const formatAttrs = (attrs: Attribute[]) =>
  attrs.filter(({ key, value }) => key && value)

const formatSingleMint = ({
  publicMetadata,
  publicFileLink,
  privateMetadata,
  privateFileLink,
}: FormatForHandleMsgParams): HandleMintNFT => {
  const publicProperties = {
    rarity: {
      number: 1,
      total: 1,
    },
  }
  const privateProperties = {
    content: privateMetadata.content,
  }
  const attributes = formatAttrs(publicMetadata.attributes)

  return {
    mint_nft: {
      token_id: cryptoRandomString({ length: 21 }),
      public_metadata: {
        name: publicMetadata.name.trim(),
        description: publicMetadata.description,
        image: publicFileLink,
        properties: JSON.stringify(publicProperties),
        attributes: JSON.stringify(attributes),
      },
      private_metadata: {
        ...(privateFileLink ? { image: privateFileLink } : {}),
        properties: JSON.stringify(privateProperties),
      },
    },
  }
}

const formatBatchMint = ({
  publicMetadata,
  publicFileLink,
  privateMetadata,
  privateFileLink,
}: FormatForHandleMsgParams): HandleBatchMintNFT => {
  const supply = parseInt(publicMetadata.supply, 10)
  const rarityId = cryptoRandomString({ length: 21 })
  const privateProperties = {
    content: privateMetadata.content,
  }
  const attributes = formatAttrs(publicMetadata.attributes)
  const mints = []

  for (let i = 0; i < supply; i++) {
    const publicProperties = {
      rarity: {
        id: rarityId,
        number: i + 1,
        total: supply,
      },
    }

    mints.push({
      token_id: cryptoRandomString({ length: 21 }),
      public_metadata: {
        name: publicMetadata.name.trim(),
        description: publicMetadata.description,
        image: publicFileLink,
        properties: JSON.stringify(publicProperties),
        attributes: JSON.stringify(attributes),
      },
      private_metadata: {
        ...(privateFileLink ? { image: privateFileLink } : {}),
        properties: JSON.stringify(privateProperties),
      },
    })
  }

  return {
    batch_mint_nft: {
      mints,
    },
  }
}

const formatForHandleMsg = (
  data: FormatForHandleMsgParams
): HandleMintNFT | HandleBatchMintNFT =>
  data.publicMetadata.supply === '1'
    ? formatSingleMint(data)
    : formatBatchMint(data)

export { formatAttrs, formatForHandleMsg }
