import Head from 'next/head'

import CreatePage from '../src/components/CreatePage'
import { getLayout } from '../src/components/Layouts/SiteLayout'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>Create token | Secret Garden</title>
    </Head>
    <CreatePage />
  </>
)

Page.getLayout = getLayout

export default Page
