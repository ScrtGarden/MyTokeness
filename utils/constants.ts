const MAX_GAS = {
  SNIP20: {
    INIT_MSG: '180000',
    MINT: '180000',
    BURN: '160000',
  },
}

const CONTRACT_CODE_ID = {
  SNIP20: 28966,
  // SNIP20: 0,
}

const SIDEBAR_TABS = {
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
        label: 'Burn',
        icon: 'fire-duo',
        route: '/manage/burn',
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

export { MAX_GAS, CONTRACT_CODE_ID, SIDEBAR_TABS }
