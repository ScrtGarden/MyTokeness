import { ParsedUrlQuery } from 'querystring'

import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { QueryContractInfo, ResultContractInfo } from '../../../interface/nft'
import isSecretAddress from '../../../utils/isSecretAddress'
import { useStoreState } from '../../hooks/storeHooks'
import useQueryContract from '../../hooks/useQueryContract'
import { Container, InnerContainer } from '../UI/Containers'
import Tabs from '../UI/Tabs'
import { PageTitle } from '../UI/Typography'

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
}

const CollectionPage = () => {
  const router = useRouter()
  const { contractAddress } = router.query as CollectionRouterQuery

  // component state
  const [tab, setTab] = useState('assets')
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

  console.log({ draftCollection, data })

  return (
    <Container>
      <InnerContainer>
        <PageTitle>
          {draftCollection?.name || data?.contract_info.name}
        </PageTitle>
        <Tabs tabs={tabs} tab={tab} onClick={setTab} />
      </InnerContainer>
    </Container>
  )
}

export default CollectionPage
