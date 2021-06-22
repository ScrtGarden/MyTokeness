import Head from 'next/head'

import Overview from '../../../../../src/components/CollectionPage/Settings/Overview'
import { getLayout } from '../../../../../src/components/Layouts/SettingsLayout'
import { HEAD_TITLE_TEXT } from '../../../../../utils/constants'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>{`Overview | ${HEAD_TITLE_TEXT}`}</title>
    </Head>
    <Overview />
  </>
)

Page.getLayout = getLayout

export default Page
