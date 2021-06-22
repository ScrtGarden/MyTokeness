import Head from 'next/head'

import Collections from '../../../src/components/CollectionsPage'
import { getLayout } from '../../../src/components/Layouts/SiteLayout'
import { HEAD_TITLE_TEXT } from '../../../utils/constants'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>{`Collections | ${HEAD_TITLE_TEXT}`}</title>
    </Head>
    <Collections />
  </>
)

Page.getLayout = getLayout

export default Page
