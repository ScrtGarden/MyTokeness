import { useEffect, useMemo } from 'react'

import { useStoreState } from '../../../hooks/storeHooks'
import useMutationGetAccounts from '../../../hooks/useMutationGetAccounts'
import Header from './Header'
import Sidebar from './Sidebar'
import { Container } from './styles'

type Props = {
  children?: React.ReactElement
}

const SiteLayout = ({ children }: Props) => {
  const store = useStoreState((state) => state)
  useMemo(() => console.log(store), [store])

  const { mutate } = useMutationGetAccounts()

  useEffect(() => {
    window.addEventListener('keplr_keystorechange', () => mutate())

    return () =>
      window.removeEventListener('keplr_keystorechange', () => mutate())
  }, [])

  useEffect(() => {
    mutate()
  }, [])

  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        {children}
      </Container>
    </>
  )
}

const getLayout = (page: JSX.Element) => <SiteLayout>{page}</SiteLayout>

export { SiteLayout as default, getLayout }
