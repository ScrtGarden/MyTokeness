import Head from 'next/head'

import { getLayout } from '../../src/components/Layouts/SiteLayout'
import Burn from '../../src/components/ManagePage/Burn'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>Burn | MyTokeness</title>
    </Head>
    <Burn />
  </>
)
Page.getLayout = getLayout

export default Page
