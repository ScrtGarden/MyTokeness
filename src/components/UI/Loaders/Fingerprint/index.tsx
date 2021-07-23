import { FC, memo } from 'react'
import Lottie from 'react-lottie-player'

import lottieJson from '../../../../../public/lotties/fingerprint.json'

type Props = {
  size?: number
}

const Fingerprint: FC<Props> = (props) => {
  const { size = 50 } = props

  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: size, height: size }}
    />
  )
}

export default memo(Fingerprint)
