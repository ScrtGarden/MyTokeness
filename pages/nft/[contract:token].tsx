import { getLayout as getSiteLayout } from '../../src/components/Layouts/SiteLayout'
import NFTPage from '../../src/components/NFTPage'

const getLayout = () => getSiteLayout(<NFTPage />, { hideSidebar: true })

const Page = (): JSX.Element => <NFTPage />

Page.getLayout = getLayout

export default Page
