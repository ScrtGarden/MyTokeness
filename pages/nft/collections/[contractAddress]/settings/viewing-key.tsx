import Head from 'next/head'

import ViewingKey from '../../../../../src/components/CollectionPage/Settings/ViewingKey'
import { getLayout } from '../../../../../src/components/Layouts/SettingsLayout'
import { HEAD_TITLE_TEXT } from '../../../../../utils/constants'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>{`Viewing Key | ${HEAD_TITLE_TEXT}`}</title>
    </Head>
    <ViewingKey />
  </>
)

Page.getLayout = getLayout

export default Page
