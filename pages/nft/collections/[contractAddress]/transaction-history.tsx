import Head from 'next/head'

import TransactionHistory from '../../../../src/components/CollectionPage/TransactionHistory'
import { getLayout } from '../../../../src/components/Layouts/CollectionLayout'
import { HEAD_TITLE_TEXT } from '../../../../utils/constants'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>{`Transaction History | ${HEAD_TITLE_TEXT}`}</title>
    </Head>
    <TransactionHistory />
  </>
)

Page.getLayout = getLayout

export default Page
