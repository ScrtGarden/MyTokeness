import Head from 'next/head'

import Assets from '../../../../src/components/CollectionPage/Assets'
import { getLayout } from '../../../../src/components/Layouts/CollectionLayout'
import { HEAD_TITLE_TEXT } from '../../../../utils/constants'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>{`Assets | ${HEAD_TITLE_TEXT}`}</title>
    </Head>
    <Assets />
  </>
)

Page.getLayout = getLayout

export default Page
