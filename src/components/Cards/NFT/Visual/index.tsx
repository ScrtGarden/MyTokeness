import mime from 'mime-types'
import Image from 'next/image'
import { FC, memo, useMemo } from 'react'

import { hashLinkPattern } from '../../../../../utils/regexPatterns'
import { ImageWrapper } from './styles'

type Props = {
  image: string
}

const Visual: FC<Props> = ({ image }) => {
  const file = useMemo(() => {
    const hashLink = image.match(hashLinkPattern)
    return {
      type: mime.lookup(image),
      hashLink: hashLink ? hashLink[0] : '',
    }
  }, [image])

  return (
    <ImageWrapper>
      <Image
        className="next-image"
        src={`https://ipfs.io/ipfs/${file.hashLink}`}
        layout="fill"
        objectFit="cover"
      />
    </ImageWrapper>
  )
}

export default memo(Visual)
