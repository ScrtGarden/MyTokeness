import Router from 'next/router'
import { useState } from 'react'
import { UseQueryResult, useQueries, useQuery } from 'react-query'

import { ResultContractInfo } from '../../../interface/nft'
import {
  CONTRACT_CODE_ID,
  MYTOKENESS_NFT_CONTRACTS,
} from '../../../utils/constants'
import { queryChain } from '../../../utils/secretjs'
import { useStoreState } from '../../hooks/storeHooks'
import CollectionCard from '../Cards/Collection'
import CreateCollection from '../Modals/CreateCollection'
import { Container, InnerContainer } from '../UI/Containers'
import { Modal } from '../UI/Modal'
import { PageTitle } from '../UI/Typography'
import { Grid } from './styles'

const Collections = () => {
  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // component state
  const [show, setShow] = useState(false)

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

  const onClickCollection = (contractAddress: string, title?: string) => {
    Router.push(
      `/nft/collections/[contractAddress]?title=${title}`,
      `/nft/collections/${contractAddress}`,
      { shallow: true }
    )
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
                onClick={() => onClickCollection(key, value.name)}
              />
            ))}
            {data &&
              collectionQueries.map(({ data: query }, index) => (
                <CollectionCard
                  key={data[index].address}
                  name={query?.contract_info.name as string}
                  icon="store-duo"
                  onClick={() =>
                    onClickCollection(
                      data[index].address,
                      query?.contract_info.name
                    )
                  }
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
      <Modal isOpen={show}>
        <CreateCollection toggle={() => setShow(!show)} />
      </Modal>
    </>
  )
}

export default Collections
