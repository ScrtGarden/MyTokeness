import { FC, forwardRef } from 'react'

import AlbumCollectionDuo from './AlbumCollectionDuo'
import AnalyticsDuo from './AnalyticsDuo'
import ArrowLeft from './ArrowLeft'
import BoxDuo from './BoxDuo'
import BoxOpenDuo from './BoxOpenDuo'
import BrowserDuo from './BrowserDuo'
import CaretDown from './CaretDown'
import CaretUp from './CaretUp'
import ChevronDown from './ChevronDown'
import ChevronLeft from './ChevronLeft'
import ChevronRight from './ChevronRight'
import ChevronUp from './ChevronUp'
import CirclePlayDuo from './CirclePlayDuo'
import CopyDuo from './CopyDuo'
import CrownLogo from './CrownLogo'
import Dizzy from './Dizzy'
import DraftingCompassDuo from './DraftingCompassDuo'
import EllipsisH from './EllipsisH'
import EllipsisV from './EllipsisV'
import ExchangeDuo from './ExchangeDuo'
import ExclamationCircle from './ExclamationCircle'
import ExclamationCircleDuo from './ExclamationCircleDuo'
import ExternalLinkDuo from './ExternalLinkDuo'
import FireDuo from './FireDuo'
import Flower from './Flower'
import FutbolBallDuo from './FutbolBallDuo'
import GiftCardDuo from './GiftCardDuo'
import GitHub from './GitHub'
import HandHoldingUSD from './HandHoldingUSD'
import HatWizardDuo from './HatWizardDuo'
import HeadphonesDuo from './HeadphonesDuo'
import HeadSideGogglesDuo from './HeadSideGogglesDuo'
import HomeDuo from './HomeDuo'
import HorizontalRule from './HorizontalRule'
import IndustryDuo from './IndustryDuo'
import Keplr from './Kelpr'
import KeySkeleton from './KeySkeleton'
import ListUlDuo from './ListUlDuo'
import LockKeyholeDuo from './LockKeyholeDuo'
import LockKeyholeOpenDuo from './LockKeyholeOpenDuo'
import Minus from './Minus'
import NarwhalDuo from './NarwhalDuo'
import Palette from './Palette'
import PencilPaintbrushDuo from './PencilPaintbrushDuo'
import PhotoVideoDuo from './PhotoVideoDuo'
import Plus from './Plus'
import PuzzlePiece from './PuzzlePiece'
import ReceiptDuo from './ReceiptDuo'
import SadTearDuo from './SadTearDuo'
import SecretNetworkLogo from './SecretNetworkLogo'
import ShieldDuo from './ShieldDuo'
import StampDuo from './StampDuo'
import StoreDuo from './StoreDuo'
import TasksAltDuo from './TasksAltDuo'
import Times from './Times'
import ToolboxDuo from './ToolboxDuo'
import TrashDuo from './TrashDuo'
import UserCircleDuo from './UserCircleDuo'
import UserCrownDuo from './UserCrownDuo'
import UsersDuo from './UsersDuo'
import UserShieldDuo from './UserShieldDuo'

type Props = {
  name?: string
  className?: string
  width?: string | number
  height?: string | number
  fill?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Icon: FC<Props> = forwardRef((props, _) => {
  const { name, className, ...rest } = props

  let SelectedIcon

  switch (name) {
    case 'futbol-ball-duo':
      SelectedIcon = FutbolBallDuo
      break
    case 'browser-duo':
      SelectedIcon = BrowserDuo
      break
    case 'hat-wizard-duo':
      SelectedIcon = HatWizardDuo
      break
    case 'head-side-goggles-duo':
      SelectedIcon = HeadSideGogglesDuo
      break
    case 'narwhal-duo':
      SelectedIcon = NarwhalDuo
      break
    case 'toolbox-duo':
      SelectedIcon = ToolboxDuo
      break
    case 'crown-logo':
      SelectedIcon = CrownLogo
      break
    case 'secret-network-logo':
      SelectedIcon = SecretNetworkLogo
      break
    case 'sad-tear-duo':
      SelectedIcon = SadTearDuo
      break
    case 'circle-play-duo':
      SelectedIcon = CirclePlayDuo
      break
    case 'headphones-duo':
      SelectedIcon = HeadphonesDuo
      break
    case 'lock-keyhole-open-duo':
      SelectedIcon = LockKeyholeOpenDuo
      break
    case 'lock-keyhole-duo':
      SelectedIcon = LockKeyholeDuo
      break
    case 'shield-duo':
      SelectedIcon = ShieldDuo
      break
    case 'user-shield-duo':
      SelectedIcon = UserShieldDuo
      break
    case 'ellipsis-v':
      SelectedIcon = EllipsisV
      break
    case 'external-link-duo':
      SelectedIcon = ExternalLinkDuo
      break
    case 'copy-duo':
      SelectedIcon = CopyDuo
      break
    case 'arrow-left':
      SelectedIcon = ArrowLeft
      break
    case 'drafting-compass-duo':
      SelectedIcon = DraftingCompassDuo
      break
    case 'trash-duo':
      SelectedIcon = TrashDuo
      break
    case 'store-duo':
      SelectedIcon = StoreDuo
      break
    case 'stamp-duo':
      SelectedIcon = StampDuo
      break
    case 'chevron-right':
      SelectedIcon = ChevronRight
      break
    case 'list-ul-duo':
      SelectedIcon = ListUlDuo
      break
    case 'analytics-duo':
      SelectedIcon = AnalyticsDuo
      break
    case 'exchange-duo':
      SelectedIcon = ExchangeDuo
      break
    case 'plus':
      SelectedIcon = Plus
      break
    case 'minus':
      SelectedIcon = Minus
      break
    case 'users-duo':
      SelectedIcon = UsersDuo
      break
    case 'hand-holding-usd':
      SelectedIcon = HandHoldingUSD
      break
    case 'tasks-alt-duo':
      SelectedIcon = TasksAltDuo
      break
    case 'user-crown-duo':
      SelectedIcon = UserCrownDuo
      break
    case 'industry-duo':
      SelectedIcon = IndustryDuo
      break
    case 'home-duo':
      SelectedIcon = HomeDuo
      break
    case 'receipt-duo':
      SelectedIcon = ReceiptDuo
      break
    case 'caret-down':
      SelectedIcon = CaretDown
      break
    case 'caret-up':
      SelectedIcon = CaretUp
      break
    case 'pencil-paintbrush-duo':
      SelectedIcon = PencilPaintbrushDuo
      break
    case 'exclamation-circle-duo':
      SelectedIcon = ExclamationCircleDuo
      break
    case 'horizontal-rule':
      SelectedIcon = HorizontalRule
      break
    case 'ellipsis-h':
      SelectedIcon = EllipsisH
      break
    case 'box-duo':
      SelectedIcon = BoxDuo
      break
    case 'box-open-duo':
      SelectedIcon = BoxOpenDuo
      break
    case 'key-skeleton':
      SelectedIcon = KeySkeleton
      break
    case 'album-collection-duo':
      SelectedIcon = AlbumCollectionDuo
      break
    case 'user-circle-duo':
      SelectedIcon = UserCircleDuo
      break
    case 'chevron-up':
      SelectedIcon = ChevronUp
      break
    case 'chevron-down':
      SelectedIcon = ChevronDown
      break
    case 'chevron-left':
      SelectedIcon = ChevronLeft
      break
    case 'palette':
      SelectedIcon = Palette
      break
    case 'gift-card-duo':
      SelectedIcon = GiftCardDuo
      break
    case 'exclamation-circle':
      SelectedIcon = ExclamationCircle
      break
    case 'times':
      SelectedIcon = Times
      break
    case 'fire-duo':
      SelectedIcon = FireDuo
      break
    case 'flower':
      SelectedIcon = Flower
      break
    case 'photo-video-duo':
      SelectedIcon = PhotoVideoDuo
      break
    case 'github':
      SelectedIcon = GitHub
      break
    case 'puzzle-piece':
      SelectedIcon = PuzzlePiece
      break
    case 'keplr':
      SelectedIcon = Keplr
      break
    default:
      SelectedIcon = Dizzy
      break
  }

  return <SelectedIcon className={className} {...rest} />
})

export default Icon
