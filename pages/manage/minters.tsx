import Head from 'next/head'

import { getLayout } from '../../src/components/Layouts/SiteLayout'
import Minters from '../../src/components/ManagePage/Minters'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>Minters | Secret Garden</title>
    </Head>
    <Minters />
  </>
)

Page.getLayout = getLayout

export default Page
