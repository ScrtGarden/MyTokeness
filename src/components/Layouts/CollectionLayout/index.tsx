import { ParsedUrlQuery } from 'querystring'

import { useRouter } from 'next/router'
import { useMemo } from 'react'

import {
  QueryContractInfo,
  ResultContractInfo,
} from '../../../../interface/nft'
import { useStoreState } from '../../../hooks/storeHooks'
import useQueryContract from '../../../hooks/useQueryContract'
import { Container, InnerContainer } from '../../UI/Containers'
import Tabs from '../../UI/Tabs'
import { PageTitle } from '../../UI/Typography'
import { getLayout as getSiteLayout } from '../SiteLayout'
import { StyledButton } from './styles'

export interface CollectionRouterQuery extends ParsedUrlQuery {
  contractAddress: string
  tab?: string
  title?: string
}

type Props = {
  children?: React.ReactElement
}

const tabs = {
  assets: { label: 'Assets' },
  settings: { label: 'Settings' },
  'transaction-history': {
    label: 'Transaction History',
  },
}

const CollectionLayout = ({ children }: Props) => {
  const router = useRouter()
  const { contractAddress, title } = router.query as CollectionRouterQuery

  const activeTab = useMemo(
    () => router.asPath.split('/')[4] || 'assets',
    [router.asPath]
  )

  // store state
  const isConnected = useStoreState((state) => state.auth.isWalletConnected)

  // custom hooks
  const { data } = useQueryContract<QueryContractInfo, ResultContractInfo>(
    ['contractInfo', contractAddress],
    contractAddress,
    { contract_info: {} }
  )

  const onClickTab = (route: string) => {
    const isAssets = route === 'assets'
    router.push(
      `/nft/collections/[contractAddress]${isAssets ? '' : `/${route}`}`,
      `/nft/collections/${contractAddress}${isAssets ? '' : `/${route}`}`,
      { shallow: true }
    )
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
        <PageTitle>{title || data?.contract_info.name}</PageTitle>
        <Tabs tabs={tabs} tab={activeTab} onClick={onClickTab} />
        {children}
      </InnerContainer>
    </Container>
  )
}

const getLayout = (page: JSX.Element) =>
  getSiteLayout(<CollectionLayout>{page}</CollectionLayout>)

export { CollectionLayout as default, getLayout }
