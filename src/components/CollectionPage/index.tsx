import { ParsedUrlQuery } from 'querystring'

import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { QueryContractInfo, ResultContractInfo } from '../../../interface/nft'
import isSecretAddress from '../../../utils/isSecretAddress'
import { useStoreState } from '../../hooks/storeHooks'
import useQueryContract from '../../hooks/useQueryContract'
import { Container, InnerContainer } from '../UI/Containers'
import Tabs from '../UI/Tabs'
import { PageTitle } from '../UI/Typography'
import Assets from './Assets'
import { StyledButton } from './styles'

const tabs = {
  assets: { label: 'Assets' },
  settings: { label: 'Settings' },
  'transaction-history': {
    label: 'Transaction History',
  },
  'contract-info': { label: 'Contract Info' },
}

export interface CollectionRouterQuery extends ParsedUrlQuery {
  contractAddress: string
  tab?: string
}

const CollectionPage = () => {
  const router = useRouter()
  const { contractAddress, tab } = router.query as CollectionRouterQuery

  // component state
  const isDraft = useMemo(
    () => !isSecretAddress(contractAddress),
    [contractAddress]
  )

  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)
  const draftCollection = useStoreState((state) =>
    state.collections.collectionById(walletAddress, contractAddress)
  )

  // custom hooks
  const { data } = useQueryContract<QueryContractInfo, ResultContractInfo>(
    ['contractInfo', contractAddress],
    contractAddress,
    { contract_info: {} },
    { enabled: !isDraft }
  )

  const onClickTab = (route: string) => {
    if (route === 'assets') {
      router.push(
        '/nft/collections/[contractAddress]',
        `/nft/collections/${contractAddress}`,
        { shallow: true }
      )
    } else {
      router.push(
        '/nft/collections/[contractAddress]/[tab]',
        `/nft/collections/${contractAddress}/${route}`,
        { shallow: true }
      )
    }
  }

  const onClickCreate = () => {
    router.push(
      '/nft/collections/[contractAddress]/create',
      `/nft/collections/${contractAddress}/create`,
      { shallow: true }
    )
  }

  return (
    <Container>
      <InnerContainer>
        <StyledButton isPrimary onClick={onClickCreate}>
          Create
        </StyledButton>
        <PageTitle>
          {draftCollection?.name || data?.contract_info.name}
        </PageTitle>
        <Tabs tabs={tabs} tab={tab ? tab : 'assets'} onClick={onClickTab} />
        {!tab && <Assets />}
      </InnerContainer>
    </Container>
  )
}

export default CollectionPage
