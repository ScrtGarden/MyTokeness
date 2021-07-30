import { IconName } from '../src/components/Icons'

export interface Item {
  label: string
  icon: IconName
  route: string
  menu?: Item[]
  as?: string
  external?: boolean
}

interface SidebarTabs {
  HOME: Item
  TOKEN: Record<string, Item>
  NFT: Record<string, Item>
}

const calcBatchMint = (amount: string): string => {
  switch (amount) {
    case '2':
      return String(parseInt(amount) * 150000)
    case '3':
      return String(parseInt(amount) * 140000)
    case '4':
      return String(parseInt(amount) * 130000)
    case '5':
    case '6':
    case '7':
      return String(parseInt(amount) * 120000)
    case '8':
    case '9':
    case '10':
      return String(parseInt(amount) * 110000)
    default:
      return String(parseInt(amount) * 100000)
  }
}

const MAX_GAS = {
  SNIP20: {
    INIT_MSG: '180000',
    MINT: '180000',
    BURN: '160000',
    SET_MINTERS: '150000',
    CHANGE_ADMIN: '140000',
    SET_CONTRACT_STATUS: '130000',
  },
  NFT: {
    INIT_MSG: '180000',
    MINT: '250000',
    BATCH_MINT: calcBatchMint,
    CREATE_VIEWING_KEY: '120000',
    SET_GLOBAL_APPROVAL: '130000',
    SET_WHITELIST_APPROVAL: '140000',
    REVEAL: '130000',
    SET_GLOBAL_APPROVAL_TOKEN: '140000',
    TRANSFER_NFT: '190000',
    BURN_NFT: '180000',
  },
}

const CONTRACT_CODE_ID =
  process.env.NEXT_PUBLIC_IS_MAINNET === 'true'
    ? { SNIP20: 77, NFT: 78 }
    : { SNIP20: 30012, NFT: 30010 }

const SIDEBAR_TABS: SidebarTabs = {
  HOME: {
    label: 'Home',
    icon: 'home-duo',
    route: '/',
  },
  TOKEN: {
    create: {
      label: 'Create',
      icon: 'industry-duo',
      route: '/create',
    },
    manage: {
      label: 'Manage',
      icon: 'tasks-alt-duo',
      route: '/manage',
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
    auction: {
      label: 'Auction',
      icon: 'gavel-duo',
      route: 'https://tulip.scrtgarden.com',
      external: true,
    },
    // track: {
    //   label: 'Track',
    //   icon: 'analytics-duo',
    //   route: '/track',
    //   menu: [
    //     {
    //       label: 'Transfers',
    //       icon: 'exchange-duo',
    //       route: '/track/transfers',
    //       as: undefined,
    //     },
    //     {
    //       label: 'Transactions',
    //       icon: 'list-ul-duo',
    //       route: '/track/transactions',
    //       as: undefined,
    //     },
    //   ],
    // },
  },
  NFT: {
    collections: {
      label: 'Collections',
      icon: 'album-collection-duo',
      route: '/nft/collections',
    },
  },
}

const FILE_UPLOADER = {
  ACCEPTS: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'audio/mp3',
    'audio/mpeg',
    'video/mp4',
  ],
  MAX_SIZE: 50000000, // 50mb
}

const CHAIN_EXPLORER = `https://secretnodes.com/secret/chains/${process.env.NEXT_PUBLIC_CHAIN_ID}`

const DATE_FORMAT = 'yyyy MMMM d, h:mm aa'

const HEAD_TITLE_TEXT =
  'Secret Garden | Create, manage and explore tokens on the Secret Network.'

const NFT_CATEGORIES = [
  { value: 'Art', label: 'Art' },
  { value: 'Collectibles', label: 'Collectibles' },
  { value: 'Domain Names', label: 'Domain Names' },
  { value: 'Gift Cards', label: 'Gift Gards' },
  { value: 'Music', label: 'Music' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Trading Cards', label: 'Trading Cards' },
  { value: 'Utility', label: 'Utility' },
  { value: 'Virtual Worlds', label: 'Virtual Worlds' },
]

const NFT_CATEGORIES_ICON_MAP: Record<
  string,
  { ICON: IconName; COLOR: string }
> = {
  Art: { ICON: 'palette', COLOR: '#FFB6B9' }, // red
  Collectibles: { ICON: 'narwhal-duo', COLOR: '#3282B8' }, // blue
  'Domain Names': { ICON: 'browser-duo', COLOR: '#E8EAE6' }, // grey
  'Gift Cards': { ICON: 'gift-card-duo', COLOR: '#9BE3DE' }, // aqua
  Music: { ICON: 'headphones-duo', COLOR: '#FFBA92' }, // orange
  Sports: { ICON: 'futbol-ball-duo', COLOR: '#A7D7C5' }, // pale green
  'Trading Cards': { ICON: 'hat-wizard-duo', COLOR: '#A685E2' }, // purple
  Utility: { ICON: 'toolbox-duo', COLOR: '#F39189' }, // reddish
  'Virtual Worlds': { ICON: 'head-side-goggles-duo', COLOR: '#A7E9AF' }, // green
}

export {
  MAX_GAS,
  CONTRACT_CODE_ID,
  SIDEBAR_TABS,
  FILE_UPLOADER,
  CHAIN_EXPLORER,
  DATE_FORMAT,
  HEAD_TITLE_TEXT,
  NFT_CATEGORIES,
  NFT_CATEGORIES_ICON_MAP,
}
