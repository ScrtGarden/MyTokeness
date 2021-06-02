import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useStoreState } from '../../../hooks/storeHooks'
import useInfiniteQueryTokens from '../../../hooks/useInfiniteQueryTokens'
import NFTCard from '../../Cards/NFT'
import { CollectionRouterQuery } from '../../Layouts/CollectionLayout'
import { ScrollWrapper } from './styles'

const Assets = () => {
  const router = useRouter()
  const { contractAddress } = router.query as CollectionRouterQuery

  // store state
  const viewingKey = useStoreState((state) =>
    state.auth.keyByContractAddress(contractAddress)
  )
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // custom hooks
  const { data, fetchNextPage, hasNextPage } = useInfiniteQueryTokens(
    walletAddress,
    contractAddress,
    {
      owner: walletAddress,
      viewing_key: viewingKey,
      limit: 10,
    }
  )

  // console.log({ data, hasNextPage })

  return (
    <ScrollWrapper>
      {data && (
        <InfiniteScroll
          className="scroll"
          dataLength={data?.pages.length * 10}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          scrollThreshold={0.9}
          loader={<h4>Loading...</h4>}
        >
          {data?.pages.map(({ token_list: { tokens } }) =>
            tokens.map((id) => (
              <NFTCard key={id} id={id} contractAddress={contractAddress} />
            ))
          )}
        </InfiniteScroll>
      )}
    </ScrollWrapper>
  )
}

export default Assets
