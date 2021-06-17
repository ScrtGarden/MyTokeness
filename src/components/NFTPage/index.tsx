import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useStoreState } from '../../hooks/storeHooks'
import useQueryNFTDossier from '../../hooks/useQueryNFTDossier'
import { Container } from './styles'
import Visual from './Visual'

const parseQuery = (value: string) => {
  const ids = value.split(':')
  return { contractAddress: ids[0], tokenId: ids[1] }
}

const NFTPage = () => {
  const router = useRouter()
  const { contractAddress, tokenId } = useMemo(
    () => parseQuery(router.query['contract:token'] as string),
    [router.query]
  )

  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)
  const viewingKey = useStoreState((state) =>
    state.auth.keyByContractAddress(contractAddress)
  )

  const { data, error } = useQueryNFTDossier(
    contractAddress,
    tokenId,
    walletAddress,
    viewingKey
  )

  console.log({ data, error })
  if (!data) {
    return <div>Broken, send help!</div>
  }

  return (
    <Container>
      <Visual
        publicImage={data.publicMetadata.image}
        privateImage={data.privateMetadata?.image}
      />
      <div>Bye</div>
    </Container>
  )
}

export default NFTPage
