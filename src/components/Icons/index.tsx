import { FC, forwardRef } from 'react'

import AlbumCollectionDuo from './AlbumCollectionDuo'
import BoxDuo from './BoxDuo'
import BoxOpenDuo from './BoxOpenDuo'
import CaretDown from './CaretDown'
import CaretUp from './CaretUp'
import ChevronDown from './ChevronDown'
import ChevronLeft from './ChevronLeft'
import ChevronUp from './ChevronUp'
import Dizzy from './Dizzy'
import EllipsisH from './EllipsisH'
import ExclamationCircle from './ExclamationCircle'
import ExclamationCircleDuo from './ExclamationCircleDuo'
import FireDuo from './FireDuo'
import Flower from './Flower'
import GiftCardDuo from './GiftCardDuo'
import GitHub from './GitHub'
import HomeDuo from './HomeDuo'
import HorizontalRule from './HorizontalRule'
import IndustryDuo from './IndustryDuo'
import Keplr from './Kelpr'
import KeySkeleton from './KeySkeleton'
import ListDuo from './ListDuo'
import Palette from './Palette'
import PencilPaintbrushDuo from './PencilPaintbrushDuo'
import PhotoVideoDuo from './PhotoVideoDuo'
import PuzzlePiece from './PuzzlePiece'
import ReceiptDuo from './ReceiptDuo'
import Times from './Times'
import UserCircleDuo from './UserCircleDuo'

type Props = {
  name?: string
  className?: string
}

const Icon: FC<Props> = forwardRef((props, _) => {
  const { name, className, ...rest } = props

  let SelectedIcon

  switch (name) {
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
    case 'list-duo':
      SelectedIcon = ListDuo
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
