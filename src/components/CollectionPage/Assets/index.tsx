import { useRouter } from 'next/router'
import { useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'

import {
  QueryContractConfig,
  QueryMinters,
  ResultContractConfig,
  ResultMinters,
} from '../../../../interface/nft'
import { MYTOKENESS_NFT_CONTRACTS } from '../../../../utils/constants'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import { useStoreState } from '../../../hooks/storeHooks'
import useInfiniteQueryTokens from '../../../hooks/useInfiniteQueryTokens'
import useQueryContract from '../../../hooks/useQueryContract'
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
  const { data: minterData } = useQueryContract<QueryMinters, ResultMinters>(
    ['minters', contractAddress],
    contractAddress,
    { minters: {} },
    { refetchOnWindowFocus: false }
  )
  const { data: config, isLoading: fetchingConfig } = useQueryContract<
    QueryContractConfig,
    ResultContractConfig
  >(
    ['contractConfig', contractAddress],
    contractAddress,
    {
      contract_config: {},
    },
    { refetchOnWindowFocus: false }
  )

  // component state
  const isMinter = useMemo(
    () =>
      (minterData &&
        minterData.minters.minters.some(
          (address) => address === walletAddress
        )) ||
      !!MYTOKENESS_NFT_CONTRACTS[contractAddress],
    [minterData, walletAddress]
  )

  if (!viewingKey) {
    return (
      <StyledEmptyList
        text="We need a viewing key to fetch your assets. Please make sure you have created one and then come back."
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
          {isLoading && fetchingConfig && (
            <>
              <Placeholder />
              <Placeholder />
              <Placeholder />
            </>
          )}
          {data?.pages.map(({ token_list: { tokens } }) =>
            tokens.map((id) => (
              <NFTCard
                key={id}
                id={id}
                contractAddress={contractAddress}
                walletAddress={walletAddress}
                viewingKey={viewingKey}
                enabledSealedData={
                  config?.contract_config.sealed_metadata_is_enabled
                }
              />
            ))
          )}
        </InfiniteScroll>
      ) : (
        <StyledEmptyList
          text={`Looks like you have no assets in this collection. ${
            isMinter ? 'Click on the button below to get started!' : ''
          } `}
          icon="pencil-paintbrush-duo"
          buttonText={isMinter ? 'Lets Go!' : undefined}
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
