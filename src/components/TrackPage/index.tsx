import { useRouter } from 'next/router'
import { FC, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import parseErrorMsg from '../../../utils/parseErrorMsg'
import { useStoreState } from '../../hooks/storeHooks'
import useDebounce from '../../hooks/useDebounce'
import useMutationSuggestToken from '../../hooks/useMutationSuggestToken'
import useQuerySnip20Info from '../../hooks/useQuerySnip20Info'
import useQuerySnip20ViewingKey from '../../hooks/useQuerySnip20ViewingKey'
import Snip20Selector from '../Cards/Snip20Selector'
import { Container, Content, InnerContainer } from '../UI/Containers'
import Spinner from '../UI/Loaders/Spinner'
import { PageTitle } from '../UI/Typography'
import { StyledEmptyList } from './styles'
import Transactions from './Transactions'
import Transfers from './Transfers'

const TrackPage: FC = () => {
  const router = useRouter()
  const tab = useMemo(() => {
    const asPathArr = router.asPath.split('/')
    return asPathArr[asPathArr.length - 1]
  }, [router.asPath])

  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  // component state
  const [contractAddress, setContractAddress] = useState('')
  const debouncedAddy = useDebounce(contractAddress, 400)
  const [error, setError] = useState('')

  // custom hooks
  const {
    data: viewingKey,
    isLoading,
    refetch,
  } = useQuerySnip20ViewingKey(
    { walletAddress, contractAddress: debouncedAddy },
    {
      enabled: !!debouncedAddy,
      onError: () => {
        setError("Can't find viewing key from Keplr Wallet.")
      },
    }
  )
  const enabled = useMemo(
    () => !!(walletAddress && contractAddress && viewingKey),
    [walletAddress, contractAddress, viewingKey]
  )
  const { data: tokenInfo, isLoading: gettingInfo } = useQuerySnip20Info(
    contractAddress,
    {
      enabled,
    }
  )

  const { mutate, isLoading: gettingKey } = useMutationSuggestToken()

  // lifecycle
  useEffect(() => {
    setError('')
  }, [debouncedAddy])

  const onClickGetKey = () => {
    mutate(debouncedAddy, {
      onSuccess: () => {
        toast.success('Created viewing key.')
        refetch()
        setError('')
      },
      onError: (error) => {
        toast.error(parseErrorMsg(error))
      },
    })
  }

  return (
    <Container>
      <InnerContainer>
        <PageTitle>
          {tab === 'transfers' ? 'Transfers' : 'Transactions'}
        </PageTitle>
        <Content single>
          <Snip20Selector
            value={contractAddress}
            debouncedValue={debouncedAddy}
            onChange={setContractAddress}
            loading={false}
            error={error}
          />
          {isLoading && <Spinner />}

          {!isLoading && !debouncedAddy && (
            <StyledEmptyList
              icon="coin-duo"
              text="To get started, please choose a token."
            />
          )}

          {!isLoading && debouncedAddy && !viewingKey && (
            <StyledEmptyList
              icon="key-skeleton"
              text="We need a viewing key to fetch your transfers."
              buttonText="Get viewing key"
              onClick={onClickGetKey}
              loading={gettingKey}
              buttonWidth={131}
            />
          )}

          {!isLoading && debouncedAddy && viewingKey && tab === 'transfers' && (
            <Transfers
              contractAddress={debouncedAddy}
              walletAddress={walletAddress}
              viewingKey={viewingKey}
              decimals={tokenInfo?.token_info.decimals}
              loading={isLoading || gettingInfo}
            />
          )}

          {!isLoading &&
            debouncedAddy &&
            viewingKey &&
            tab === 'transactions' && (
              <Transactions
                contractAddress={debouncedAddy}
                walletAddress={walletAddress}
                viewingKey={viewingKey}
                decimals={tokenInfo?.token_info.decimals}
                loading={isLoading || gettingInfo}
              />
            )}
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default TrackPage
