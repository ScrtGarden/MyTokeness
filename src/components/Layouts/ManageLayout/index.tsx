import { useRouter } from 'next/router'
import { FC, useEffect, useMemo, useState } from 'react'

import useDebounce from '../../../hooks/useDebounce'
import useQuerySnip20Config from '../../../hooks/useQuerySnip20Config'
import useUpdateEffect from '../../../hooks/useUpdateEffect'
import BurnCard from '../../Cards/BurnCard'
import ChangeAdminCard from '../../Cards/ChangeAdminCard'
import ChangeStatusCard from '../../Cards/ChangeAdminCard'
import MintCard from '../../Cards/MintCard'
import MintersCard from '../../Cards/MintersCard'
import Snip20Selector from '../../Cards/Snip20Selector'
import { Container, Content, InnerContainer } from '../../UI/Containers'
import { PageTitle } from '../../UI/Typography'
import { getLayout as getSiteLayout } from '../SiteLayout'

const ManageLayout: FC = () => {
  const router = useRouter()
  const tab = useMemo(() => {
    const asPathArr = router.asPath.split('/')
    return asPathArr[asPathArr.length - 1]
  }, [router.asPath])

  // component state
  const [contractAddress, setContractAddress] = useState('')
  const debouncedAddy = useDebounce(contractAddress, 400)
  const [error, setError] = useState('')
  const [enableButton, setEnableButton] = useState(false)

  // custom hooks
  const { data, isLoading, isSuccess } = useQuerySnip20Config(debouncedAddy, {
    onSuccess: (data) => {
      if (
        (tab === 'mint' || tab === 'minters') &&
        !data.token_config.mint_enabled
      ) {
        setError('Mint functionality is disabled.')
        setEnableButton(false)
      } else if (tab === 'burn' && !data.token_config.burn_enabled) {
        setError('Burn functionality is disabled.')
        setEnableButton(false)
      } else {
        setEnableButton(true)
      }
    },
    onError: () => {
      setError('Unable to fetch token information.')
    },
  })

  // component state
  useMemo(() => {
    if (
      (tab === 'mint' || tab === 'minters') &&
      data &&
      !data?.token_config.mint_enabled
    ) {
      setError('Mint functionality is disabled.')
      setEnableButton(false)
    } else if (
      (tab === 'mint' || tab === 'minters') &&
      data &&
      data?.token_config.mint_enabled
    ) {
      setError('')
      setEnableButton(true)
    } else if (tab === 'burn' && data && !data?.token_config.burn_enabled) {
      setError('Burn functionality is disabled.')
      setEnableButton(false)
    } else if (tab === 'burn' && data && data?.token_config.burn_enabled) {
      setError('')
      setEnableButton(true)
    }
  }, [tab, data])

  // lifecycle
  useEffect(() => {
    setError('')
  }, [debouncedAddy])

  useUpdateEffect(() => {
    if (!debouncedAddy) {
      setEnableButton(false)
    }
  }, [debouncedAddy])

  return (
    <Container>
      <InnerContainer>
        <PageTitle>
          {tab === 'mint' && 'Mint'}
          {tab === 'burn' && 'Burn'}
          {tab === 'minters' && 'Minters'}
          {tab === 'admin' && 'Admin'}
        </PageTitle>
        <Content single>
          <Snip20Selector
            value={contractAddress}
            debouncedValue={debouncedAddy}
            onChange={setContractAddress}
            loading={isLoading}
            error={error}
          />
          {tab === 'mint' && (
            <MintCard
              contractAddress={contractAddress}
              success={isSuccess}
              enableButton={enableButton}
            />
          )}
          {tab === 'burn' && (
            <BurnCard
              contractAddress={contractAddress}
              success={isSuccess}
              enableButton={enableButton}
            />
          )}
          {tab === 'minters' && (
            <MintersCard
              contractAddress={contractAddress}
              success={isSuccess}
              enableButton={enableButton}
            />
          )}
          {tab === 'admin' && (
            <>
              <ChangeAdminCard
                contractAddress={contractAddress}
                enableButton={enableButton}
              />
              <ChangeStatusCard
                contractAddress={contractAddress}
                enableButton={enableButton}
              />
            </>
          )}
        </Content>
      </InnerContainer>
    </Container>
  )
}

const getLayout = (): JSX.Element => getSiteLayout(<ManageLayout />)

export { ManageLayout as default, getLayout }
