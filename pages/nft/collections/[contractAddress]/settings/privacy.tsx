import Head from 'next/head'

import Privacy from '../../../../../src/components/CollectionPage/Settings/Privacy'
import { getLayout } from '../../../../../src/components/Layouts/SettingsLayout'
import { HEAD_TITLE_TEXT } from '../../../../../utils/constants'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>{`Privacy Settings | ${HEAD_TITLE_TEXT}`}</title>
    </Head>
    <Privacy />
  </>
)

Page.getLayout = getLayout

export default Page
