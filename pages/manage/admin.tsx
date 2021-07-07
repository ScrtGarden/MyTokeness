import Head from 'next/head'

import { getLayout } from '../../src/components/Layouts/SiteLayout'
import Admin from '../../src/components/ManagePage/Admin'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>Admin | Secret Garden</title>
    </Head>
    <Admin />
  </>
)

Page.getLayout = getLayout

export default Page
