import { Container } from './styles'
import Tab from './Tab'

const TABS = {
  '/': {
    label: 'Home',
    icon: 'home-duo',
    route: '/',
  },
  create: {
    label: 'Create',
    icon: 'industry-duo',
    route: '/create',
  },
  'transaction-history': {
    label: 'Transaction History',
    icon: 'receipt-duo',
  },
}

const Sidebar = () => (
  <Container>
    {Object.entries(TABS).map(([key, value]) => (
      <Tab key={key} item={value} id={key} />
    ))}
  </Container>
)

export default Sidebar
