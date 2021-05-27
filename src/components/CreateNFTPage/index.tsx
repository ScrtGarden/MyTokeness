import { ParsedUrlQuery } from 'querystring'

import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { QueryContractInfo, ResultContractInfo } from '../../../interface/nft'
import isSecretAddress from '../../../utils/isSecretAddress'
import { useStoreState } from '../../hooks/storeHooks'
import useQueryContract from '../../hooks/useQueryContract'
import { Container, InnerContainer } from '../UI/Containers'
import { PageTitle } from '../UI/Typography'
import BackLink from './BackLink'
import Form from './Form'

export interface CreateRouterQuery extends ParsedUrlQuery {
  contractAddress: string
  tab?: string
}

const CreateNFTPage = () => {
  const router = useRouter()
  const { contractAddress } = router.query as CreateRouterQuery

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

  return (
    <Container>
      <InnerContainer>
        <BackLink label={draftCollection?.name || data?.contract_info.name} />
        <PageTitle>Create your collectible</PageTitle>
        <Form />
      </InnerContainer>
    </Container>
  )
}

export default CreateNFTPage
