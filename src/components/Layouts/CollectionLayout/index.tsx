import { ParsedUrlQuery } from 'querystring'

import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'

import useQueryCollectionInfo from '../../../hooks/useQueryCollectionInfo'
import { Container } from '../../UI/Containers'
import Tabs from '../../UI/Tabs'
import { getLayout as getSiteLayout } from '../SiteLayout'
import Header from './Header'
import { StyledInnerContainer } from './styles'

export interface CollectionRouterQuery extends ParsedUrlQuery {
  contractAddress: string
  title?: string
}

type Props = {
  children?: React.ReactElement
}

const tabs = {
  assets: { label: 'Assets' },
  'transaction-history': {
    label: 'Transaction History',
  },
  settings: { label: 'Settings' },
}

const CollectionLayout: FC<Props> = ({ children }) => {
  const router = useRouter()
  const { contractAddress, title } = router.query as CollectionRouterQuery

  // custom hooks
  const { data, isLoading } = useQueryCollectionInfo(contractAddress)

  // component state
  const activeTab = useMemo(
    () => router.asPath.split('/')[4] || 'assets',
    [router.asPath]
  )
  const headerProps = useMemo(() => {
    if (activeTab === 'assets') {
      return { title: title || data?.contract_info.name }
    } else if (activeTab === 'transaction-history') {
      return {
        title: 'Transaction History',
        subtext: 'A list of transactions made on this collection.',
      }
    } else {
      return {
        title: 'Collection Settings',
        subtext: 'Update the settings of this collection.',
      }
    }
  }, [data, activeTab, title])

  const onClickTab = (route: string) => {
    const isAssets = route === 'assets'
    router.push(
      `/nft/collections/[contractAddress]${isAssets ? '' : `/${route}`}`,
      `/nft/collections/${contractAddress}${isAssets ? '' : `/${route}`}`,
      { shallow: true }
    )
  }

  return (
    <Container>
      <StyledInnerContainer>
        <Tabs tabs={tabs} tab={activeTab} onClick={onClickTab} />
        <Header
          {...headerProps}
          contractAddress={contractAddress}
          loading={isLoading}
          activeTab={activeTab}
        />
        {children}
      </StyledInnerContainer>
    </Container>
  )
}

const getLayout = (page: JSX.Element): JSX.Element =>
  getSiteLayout(<CollectionLayout>{page}</CollectionLayout>)

export { CollectionLayout as default, getLayout }
