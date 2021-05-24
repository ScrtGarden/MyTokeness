import { SIDEBAR_TABS } from '../../../../../utils/constants'
import { Container, SectionHeader } from './styles'
import Tab from './Tab'

const Sidebar = () => (
  <Container>
    <Tab item={SIDEBAR_TABS.HOME} />
    <SectionHeader>TOKEN</SectionHeader>
    {Object.entries(SIDEBAR_TABS.TOKEN).map(([key, value]) => (
      <Tab key={key} item={value} />
    ))}
    <SectionHeader>NFT</SectionHeader>
    {Object.entries(SIDEBAR_TABS.NFT).map(([key, value]) => (
      <Tab key={key} item={value} />
    ))}
  </Container>
)

export default Sidebar
