import { getLayout } from '../../src/components/Layouts/SiteLayout'
import Track from '../../src/components/TrackPage'

const Page = (): JSX.Element => <Track />

Page.getLayout = getLayout

export default Page
