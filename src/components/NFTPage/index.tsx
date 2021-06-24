import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { HEAD_TITLE_TEXT } from '../../../utils/constants'
import { useStoreState } from '../../hooks/storeHooks'
import useQueryCollectionInfo from '../../hooks/useQueryCollectionInfo'
import useQueryNFTDossier from '../../hooks/useQueryNFTDossier'
import CreateViewingKey from './CreateViewingKey'
import Sidebar from './Sidebar'
import SkeletonPage from './SkeletonPage'
import { Container, StyledBack, StyledEmptyList } from './styles'
import Visual from './Visual'

const parseQuery = (value: string) => {
  const ids = value.split(':')
  return { contractAddress: ids[0], tokenId: ids[1] }
}

const parseName = (name: string) => {
  return name.includes('collection') ? name : `${name} Collection`
}

const NFTPage = (): JSX.Element => {
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

  // custom hooks
  const { data: info, isLoading: fetchingInfo } =
    useQueryCollectionInfo(contractAddress)
  const { data, error, isLoading } = useQueryNFTDossier(
    contractAddress,
    tokenId,
    !!viewingKey ? { walletAddress, viewingKey } : undefined,
    { keepPreviousData: true }
  )

  const collectionName = useMemo(
    () => (info ? parseName(info.contract_info.name) : ''),
    [info]
  )

  if (isLoading || fetchingInfo) {
    return (
      <>
        <Head>
          <title>{HEAD_TITLE_TEXT}</title>
        </Head>
        <SkeletonPage />
      </>
    )
  }

  if (!data || error) {
    return (
      <>
        <Head>
          <title>{HEAD_TITLE_TEXT}</title>
        </Head>
        <StyledBack label="Back" />
        <StyledEmptyList
          text="Ooops! Looks like something went wrong."
          icon="sad-tear-duo"
        />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{`${data.publicMetadata.name} | ${HEAD_TITLE_TEXT}`}</title>
      </Head>
      <Container>
        <StyledBack label="Back" />
        <Visual
          publicImage={data.publicMetadata.image}
          privateImage={data.privateMetadata?.image}
        />
        <Sidebar
          collectionName={collectionName}
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
      </Container>
    </>
  )
}

export default NFTPage
