import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'

import { Container, Tab } from './styles'

const TABS = {
  overview: 'Overview',
  privacy: 'Privacy',
  'viewing-key': 'Viewing Key',
}

const Sidebar = () => {
  const router = useRouter()
  const { contractAddress } = router.query

  // component state
  const activeTab = useMemo(
    () => router.asPath.split('/')[5] || 'overview',
    [router.asPath]
  )

  const onClickTab = (value: string) => {
    router.push(
      `/nft/collections/[contractAddress]/settings${
        value === 'overview' ? '' : `/${value}`
      }`,
      `/nft/collections/${contractAddress}/settings${
        value === 'overview' ? '' : `/${value}`
      }`,
      { shallow: true }
    )
  }

  return (
    <Container>
      {Object.entries(TABS).map(([value, label]) => (
        <Tab
          key={value}
          selected={value === activeTab}
          onClick={() => onClickTab(value)}
        >
          {label}
        </Tab>
      ))}
    </Container>
  )
}

export default memo(Sidebar)
