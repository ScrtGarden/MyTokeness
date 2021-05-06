import Footer from '../../Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import { Container } from './styles'

type Props = {
  children?: React.ReactElement
}

const SiteLayout = ({ children }: Props) => {
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
