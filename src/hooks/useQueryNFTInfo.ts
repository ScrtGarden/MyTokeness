import { useQuery } from 'react-query'

import { ResultNFTInfo } from '../../interface/nft'
import { UIPublicMetadata } from '../../interface/nft-ui'
import { queryChain } from '../../utils/secretjs'

const useQueryNFTInfo = (contractAddress: string, id: string) =>
  useQuery<ResultNFTInfo, Error, UIPublicMetadata>(
    ['nftInfo', contractAddress, id],
    () =>
      queryChain.queryContractSmart(contractAddress, {
        nft_info: { token_id: id },
      }),
    { refetchOnWindowFocus: false, select: formatNFTInfo }
  )

const formatNFTInfo = (original: ResultNFTInfo): UIPublicMetadata => {
  const {
    nft_info: { image, name, attributes, description, properties },
  } = original

  return {
    attributes:
      !attributes || attributes === null ? [] : JSON.parse(attributes),
    description,
    image,
    name,
    properties:
      !properties || properties === null ? [] : JSON.parse(properties),
  }
}

export default useQueryNFTInfo
