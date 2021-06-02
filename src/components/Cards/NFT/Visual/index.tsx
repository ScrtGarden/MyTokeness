import mime from 'mime-types'
import Image from 'next/image'
import { FC, FormEvent, memo, useMemo } from 'react'
import ReactPlayer from 'react-player'

import { hashLinkPattern } from '../../../../../utils/regexPatterns'
import { ImageWrapper } from './styles'

type Props = {
  image: string
}

const Visual: FC<Props> = ({ image }) => {
  const { type, hashLink } = useMemo(() => {
    const hashLink = image.match(hashLinkPattern)
    const mimeType = mime.lookup(image)
    return {
      type: mimeType ? mimeType.split('/')[0] : undefined,
      hashLink: hashLink ? hashLink[0] : '',
    }
  }, [image])

  return (
    <ImageWrapper type={type}>
      {type &&
        (type === 'image' ? (
          <Image
            className="next-image"
            src={`https://ipfs.io/ipfs/${hashLink}`}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <ReactPlayer
            className="react-player"
            url={`https://ipfs.io/ipfs/${hashLink}`}
            width="100%"
            height="100%"
            controls
            light={type === 'audio' ? '/images/audio-thumbnail.png' : undefined}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  disablePictureInPicture: true,
                  onContextMenu: (e: FormEvent) => e.preventDefault(),
                  ...(type === 'audio'
                    ? {
                        poster: '/images/audio-thumbnail.png',
                      }
                    : {}),
                },
              },
            }}
          />
        ))}
    </ImageWrapper>
  )
}

export default memo(Visual)
