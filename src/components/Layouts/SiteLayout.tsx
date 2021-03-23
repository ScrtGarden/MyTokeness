import Footer from '../Footer'
import Header from '../Header'

type Props = {
  children?: React.ReactElement
}

const SiteLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

const getLayout = (page: JSX.Element) => <SiteLayout>{page}</SiteLayout>

export { SiteLayout as default, getLayout }
