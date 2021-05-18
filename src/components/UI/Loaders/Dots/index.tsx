import { FC, memo } from 'react'
import Lottie from 'react-lottie-player'

import DOTS_BLACK from '../../../../../public/lotties/dots-black.json'
import DOTS_WHITE from '../../../../../public/lotties/dots-white.json'

type Props = {
  className?: string
  color?: 'white' | 'black'
}

const Dots: FC<Props> = (props) => {
  const { className, color = 'black' } = props

  return (
    <Lottie
      className={className}
      loop
      animationData={color === 'black' ? DOTS_BLACK : DOTS_WHITE}
      play
    />
  )
}

export default memo(Dots)
