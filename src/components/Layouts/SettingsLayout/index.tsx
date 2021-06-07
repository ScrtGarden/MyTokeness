import { getLayout as getCollectionLayout } from '../CollectionLayout'
import Sidebar from './Sidebar'
import { Container } from './styles'

type Props = {
  children?: React.ReactElement
}

const SettingsLayout = ({ children }: Props) => (
  <Container>
    <Sidebar />
    {children}
  </Container>
)

const getLayout = (page: JSX.Element) =>
  getCollectionLayout(<SettingsLayout>{page}</SettingsLayout>)

export { SettingsLayout as default, getLayout }
