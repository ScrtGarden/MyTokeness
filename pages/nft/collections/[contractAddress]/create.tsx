import Head from 'next/head'

import CreateNFTPage from '../../../../src/components/CreateNFTPage'
import { getLayout } from '../../../../src/components/Layouts/SiteLayout'
import { HEAD_TITLE_TEXT } from '../../../../utils/constants'

const Page = (): JSX.Element => (
  <>
    <Head>
      <title>{`Create NFT | ${HEAD_TITLE_TEXT}`}</title>
    </Head>
    <CreateNFTPage />
  </>
)

Page.getLayout = getLayout

export default Page
