import Head from 'next/head'

import { getLayout } from '../../src/components/Layouts/ManageLayout'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>Minters | Secret Garden</title>
    </Head>
  </>
)

Page.getLayout = getLayout

export default Page
