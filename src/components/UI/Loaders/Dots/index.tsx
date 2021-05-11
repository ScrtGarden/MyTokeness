import { FC, memo } from 'react'
import Lottie from 'react-lottie-player'

import DOTS from '../../../../../public/lotties/dots-black.json'

type Props = {
  className?: string
}

const Dots: FC<Props> = (props) => {
  const { className } = props

  return <Lottie className={className} loop animationData={DOTS} play />
}

export default memo(Dots)
