import Head from 'next/head'

import { getLayout } from '../../src/components/Layouts/SiteLayout'
import Burn from '../../src/components/ManagePage/Burn'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>Burn | Secret Garden</title>
    </Head>
    <Burn />
  </>
)
Page.getLayout = getLayout

export default Page
