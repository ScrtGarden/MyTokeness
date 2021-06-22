import CreatePage from '../src/components/CreatePage'
import { getLayout } from '../src/components/Layouts/SiteLayout'

const Page = (): JSX.Element => <CreatePage />

Page.getLayout = getLayout

export default Page
