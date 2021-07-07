import Head from 'next/head'

import Home from '../src/components/HomePage'
import { getLayout } from '../src/components/Layouts/SiteLayout'
import { HEAD_TITLE_TEXT } from '../utils/constants'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>{`Welcome to the ${HEAD_TITLE_TEXT}`}</title>
    </Head>
    <Home />
  </>
)

Page.getLayout = getLayout

export default Page
