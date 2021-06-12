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
import useToggle from '../../hooks/useToggle'
import CollectionCard from '../Cards/Collection'
import AddCollection from '../Modals/AddCollection'
import CreateCollection from '../Modals/CreateCollection'
import Warning from '../Modals/Warning'
import { IconButton, StyledIcon } from '../UI/Buttons'
import { Container, InnerContainer } from '../UI/Containers'
import Dropdown from '../UI/Dropdowns/Menu'
import { Modal } from '../UI/Modal'
import Menu from './Menu'
import { Grid, Header, SkeletonCard, StyledTitle } from './styles'

const Collections = () => {
  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)
  const addedCollections = useStoreState(
    (state) => state.collections.collectionsByAddress
  )

  // store actions
  const removeCollection = useStoreActions(
    (actions) => actions.collections.removeCollection
  )

  // component state
  const [showCreate, toggleCreate] = useToggle()
  const [showAdd, toggleAdd] = useToggle()
  const [showWarn, toggleWarn] = useToggle()
  const [showDropdown, toggleDropdown] = useToggle()
  const [toBeRemoved, setToBeRemoved] = useState({ address: '', name: '' })

  const { data, isLoading } = useQuery(
    ['collections', walletAddress],
    () => queryChain.getContracts(CONTRACT_CODE_ID.NFT),
    {
      refetchOnWindowFocus: false,
      select: (data) => data.filter((item) => item.creator === walletAddress),
    }
  )

  const collectionQueries = useQueries(
    data?.map(({ address }) => ({
      queryKey: ['contractInfo', address],
      queryFn: () =>
        queryChain.queryContractSmart(address, { contract_info: {} }),
      refetchOnWindowFocus: false,
    })) ?? []
  ) as UseQueryResult<ResultContractInfo, Error>[]

  const addedCollectionQueries = useQueries(
    addedCollections.map(({ address }) => ({
      queryKey: ['contractInfo', address],
      queryFn: () =>
        queryChain.queryContractSmart(address, { contract_info: {} }),
      refetchOnWindowFocus: false,
    })) ?? []
  ) as UseQueryResult<ResultContractInfo, Error>[]

  const onClickCollection = (contractAddress: string, title?: string) => {
    Router.push(
      `/nft/collections/[contractAddress]?title=${title}`,
      `/nft/collections/${contractAddress}`,
      { shallow: true }
    )
  }

  const onClickRemove = (
    e: MouseEvent<HTMLButtonElement>,
    address: string,
    name: string
  ) => {
    e.stopPropagation()
    setToBeRemoved({ address, name })
    toggleWarn()
  }

  const onRemove = () => {
    removeCollection(toBeRemoved.address)
    toggleWarn()
  }

  const onClickMenuAdd = () => {
    toggleAdd()
    toggleDropdown()
  }

  const onClickMenuCreate = () => {
    toggleCreate()
    toggleDropdown()
  }

  return (
    <>
      <Container>
        <InnerContainer>
          <Header>
            <StyledTitle>Collections</StyledTitle>
            <Dropdown
              isOpen={showDropdown}
              toggle={toggleDropdown}
              content={
                <Menu
                  onClickAdd={onClickMenuAdd}
                  onClickCreate={onClickMenuCreate}
                />
              }
            >
              <IconButton>
                <StyledIcon name="ellipsis-v" width={25} height={25} />
              </IconButton>
            </Dropdown>
          </Header>
          <Grid>
            {Object.entries(MYTOKENESS_NFT_CONTRACTS).map(([key, value]) => (
              <CollectionCard
                key={key}
                name={value.name}
                icon={value.icon}
                onClick={() => onClickCollection(key, value.name)}
              />
            ))}
            {isLoading && <SkeletonCard height="unset" width="100%" />}
            {data &&
              collectionQueries.map(({ data: query, isLoading }, index) => (
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
                  loading={isLoading}
                  isOwner
                />
              ))}
            {!isLoading &&
              addedCollectionQueries.map(
                ({ data: query, isLoading }, index) => {
                  const address = addedCollections[index].address
                  const name = query?.contract_info.name as string
                  return (
                    <CollectionCard
                      key={address}
                      name={name}
                      icon="store-duo"
                      onClick={() => onClickCollection(address, name)}
                      loading={isLoading}
                      onClickRemove={(e) => onClickRemove(e, address, name)}
                    />
                  )
                }
              )}
          </Grid>
        </InnerContainer>
      </Container>
      <Modal isOpen={showCreate}>
        <CreateCollection toggle={toggleCreate} />
      </Modal>
      <Modal isOpen={showAdd}>
        <AddCollection
          toggle={toggleAdd}
          addedCollections={addedCollections}
          myCollections={data || []}
        />
      </Modal>
      <Modal isOpen={showWarn} onBackgroundClick={toggleWarn}>
        <Warning
          title="Remove collection"
          text={`The following collection, ${toBeRemoved.name}, will be permanently deleted. Are you sure you want to continue?`}
          onClickPrimary={onRemove}
          toggle={toggleWarn}
        />
      </Modal>
    </>
  )
}

export default Collections
