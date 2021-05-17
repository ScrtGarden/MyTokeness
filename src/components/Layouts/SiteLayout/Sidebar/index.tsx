import { SIDEBAR_TABS } from '../../../../../utils/constants'
import { Container } from './styles'
import Tab from './Tab'

const Sidebar = () => (
  <Container>
    {Object.entries(SIDEBAR_TABS).map(([key, value]) => (
      <Tab key={key} item={value} id={key} />
    ))}
  </Container>
)

export default Sidebar
