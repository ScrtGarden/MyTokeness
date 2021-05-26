import Router from 'next/router'
import { MouseEvent, useState } from 'react'
import { UseQueryResult, useQueries, useQuery } from 'react-query'

import { ResultContractInfo } from '../../../interface/nft'
import {
  CONTRACT_CODE_ID,
  MYTOKENESS_NFT_CONTRACTS,
} from '../../../utils/constants'
import { queryChain } from '../../../utils/secretjs'
import { useStoreActions, useStoreState } from '../../hooks/storeHooks'
import CollectionCard from '../Cards/Collection'
import CreateCollection from '../Modals/ConfigureCollection'
import { StyledModal } from '../Modals/ConfigureCollection/styles'
import WarningModal from '../Modals/Warning'
import { Container, InnerContainer } from '../UI/Containers'
import { PageTitle } from '../UI/Typography'
import { Grid } from './styles'

const Collections = () => {
  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)
  const draftCollections = useStoreState((state) =>
    state.collections.draftCollectionsByAddress(walletAddress)
  )

  // store actions
  const removeCollection = useStoreActions(
    (actions) => actions.collections.removeCollection
  )

  // component state
  const [show, setShow] = useState(false)
  const [showWarn, setShowWarn] = useState(false)
  const [idToBeRemoved, setIdToBeRemoved] = useState('')

  const { data } = useQuery(
    ['collections', walletAddress],
    () => queryChain.getContracts(CONTRACT_CODE_ID.NFT),
    { select: (data) => data.filter((item) => item.creator === walletAddress) }
  )

  const collectionQueries = useQueries(
    data?.map(({ address }) => ({
      queryKey: ['contractInfo', address],
      queryFn: () =>
        queryChain.queryContractSmart(address, { contract_info: {} }),
    })) ?? []
  ) as UseQueryResult<ResultContractInfo, Error>[]

  const onClickCollection = (contractAddress: string) => {
    Router.push(
      '/nft/collections/[contractAddress]',
      `/nft/collections/${contractAddress}`,
      { shallow: true }
    )
  }

  const onClickRemove = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()
    setIdToBeRemoved(id)
    setShowWarn(true)
  }

  const onRemove = () => {
    removeCollection({ id: idToBeRemoved, walletAddress })
    setShowWarn(false)
  }

  return (
    <>
      <Container>
        <InnerContainer>
          <PageTitle>Collections</PageTitle>
          <Grid>
            {Object.entries(MYTOKENESS_NFT_CONTRACTS).map(([key, value]) => (
              <CollectionCard
                key={key}
                name={value.name}
                icon={value.icon}
                onClick={() => onClickCollection(key)}
              />
            ))}
            {data &&
              collectionQueries.map(({ data: query }, index) => (
                <CollectionCard
                  key={data[index].address}
                  name={query?.contract_info.name as string}
                  icon="store-duo"
                  onClick={() => onClickCollection(data[index].address)}
                />
              ))}
            {draftCollections.map((config) => (
              <CollectionCard
                key={config.id}
                name={config.name}
                icon="drafting-compass-duo"
                onClick={() => onClickCollection(config.id)}
                draft
                onClickRemove={(e) => onClickRemove(e, config.id)}
              />
            ))}
            <CollectionCard
              name="Create New Collection"
              icon="plus"
              onClick={() => setShow(!show)}
            />
          </Grid>
        </InnerContainer>
      </Container>
      <StyledModal isOpen={show}>
        <CreateCollection toggle={() => setShow(!show)} />
      </StyledModal>
      <WarningModal
        title="Remove draft collection"
        text="Are you sure you want to remove this collection?"
        isOpen={showWarn}
        toggle={() => setShowWarn(!showWarn)}
        onBackgroundClick={() => setShowWarn(!showWarn)}
        onClickPrimary={onRemove}
      />
    </>
  )
}

export default Collections
