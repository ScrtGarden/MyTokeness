import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useStoreState } from '../../hooks/storeHooks'
import useQueryNFTDossier from '../../hooks/useQueryNFTDossier'
import CreateViewingKey from './CreateViewingKey'
import Sidebar from './Sidebar'
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
    !!viewingKey ? { walletAddress, viewingKey } : undefined,
    { keepPreviousData: true }
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
      <>
        <Sidebar
          publicMetadata={data.publicMetadata}
          privateContent={data.privateMetadata?.properties.content}
          owner={data.owner}
        />
        {!viewingKey && (
          <CreateViewingKey
            walletAddress={walletAddress}
            contractAddress={contractAddress}
          />
        )}
      </>
    </Container>
  )
}

export default NFTPage
