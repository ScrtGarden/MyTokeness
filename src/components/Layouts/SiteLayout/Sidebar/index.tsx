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
  manage: {
    label: 'Manage',
    icon: 'tasks-alt-duo',
    menu: [
      {
        label: 'Mint',
        icon: 'hand-holding-usd',
        route: '/manage/mint',
        as: undefined,
      },
      {
        label: 'Minters',
        icon: 'users-duo',
        route: '/manage/minters',
        as: undefined,
      },
      {
        label: 'Admin',
        icon: 'user-crown-duo',
        route: '/manage/admin',
        as: undefined,
      },
    ],
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
