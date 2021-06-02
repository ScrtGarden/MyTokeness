import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'

import parseErrorMsg from '../../../../utils/parseErrorMsg'
import { useStoreState } from '../../../hooks/storeHooks'
import useInfiniteQueryTokens from '../../../hooks/useInfiniteQueryTokens'
import NFTCard from '../../Cards/NFT'
import { CollectionRouterQuery } from '../../Layouts/CollectionLayout'
import { Placeholder, ScrollWrapper, StyledEmptyList } from './styles'

const LIMIT = 9

const Assets = () => {
  const router = useRouter()
  const { contractAddress } = router.query as CollectionRouterQuery

  // store state
  const viewingKey = useStoreState((state) =>
    state.auth.keyByContractAddress(contractAddress)
  )
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // custom hooks
  const { data, fetchNextPage, hasNextPage, isLoading, error, isError } =
    useInfiniteQueryTokens(walletAddress, contractAddress, {
      owner: walletAddress,
      viewing_key: viewingKey,
      limit: LIMIT,
    })

  if (!viewingKey) {
    return (
      <StyledEmptyList
        text="We need a viewing key to find your assets. Please make sure you have created one and then come back."
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
    )
  }

  if (isError && error !== null) {
    toast.error(parseErrorMsg(error))
    return (
      <StyledEmptyList
        text="Ooops! Looks like something went wrong."
        icon="exclamation-circle-duo"
      />
    )
  }

  return (
    <ScrollWrapper>
      {data?.pages[0].token_list.tokens.length !== 0 ? (
        <InfiniteScroll
          className="scroll"
          dataLength={data?.pages.length || LIMIT * LIMIT}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          scrollThreshold={0.9}
          loader={
            <>
              <Placeholder />
              <Placeholder />
              <Placeholder />
            </>
          }
        >
          {isLoading && (
            <>
              <Placeholder />
              <Placeholder />
              <Placeholder />
            </>
          )}
          {data?.pages.map(({ token_list: { tokens } }) =>
            tokens.map((id) => (
              <NFTCard key={id} id={id} contractAddress={contractAddress} />
            ))
          )}
        </InfiniteScroll>
      ) : (
        <StyledEmptyList
          text="Looks like you have no assets in this collection. Click on the button below to get started!"
          icon="pencil-paintbrush-duo"
          buttonText="Lets Go!"
          onClick={() =>
            router.push(
              '/nft/collections/[contractAddress]/create',
              `/nft/collections/${contractAddress}/create`,
              { shallow: true }
            )
          }
        />
      )}
    </ScrollWrapper>
  )
}

export default Assets
