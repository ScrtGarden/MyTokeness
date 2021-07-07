import Head from 'next/head'

import { getLayout } from '../../src/components/Layouts/SiteLayout'
import Mint from '../../src/components/ManagePage/Mint'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>Mint | Secret Garden</title>
    </Head>
    <Mint />
  </>
)

Page.getLayout = getLayout

export default Page
