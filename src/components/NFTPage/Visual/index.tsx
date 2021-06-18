import Image from 'next/image'
import { FC, FormEvent, memo, useEffect, useMemo, useState } from 'react'
import ReactPlayer from 'react-player'

import getImageLinkProps from '../../../../utils/getImageLinkProps'
import { Container } from './styles'

type Props = {
  privateImage?: string
  publicImage: string
}

const Visual: FC<Props> = ({ privateImage, publicImage }) => {
  const publicImageProps = useMemo(
    () => getImageLinkProps(publicImage),
    [publicImage]
  )
  const privateImageProps = useMemo(
    () => (privateImage ? getImageLinkProps(privateImage) : undefined),
    [privateImage]
  )
  const [{ type, hashLink }, setImageProps] = useState(
    privateImageProps || publicImageProps
  )

  useEffect(() => {
    setImageProps(privateImageProps || publicImageProps)
  }, [privateImageProps, publicImageProps])

  return (
    <Container>
      {type === 'image' && (
        <Image
          src={`https://ipfs.io/ipfs/${hashLink}`}
          layout="fill"
          objectFit="contain"
          alt=""
        />
      )}

      {type === 'audio' && (
        <ReactPlayer
          className="react-player"
          url={`https://ipfs.io/ipfs/${hashLink}`}
          width="100%"
          height="100%"
          controls
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                disablePictureInPicture: true,
                onContextMenu: (e: FormEvent) => e.preventDefault(),
                poster: privateImageProps
                  ? `https://ipfs.io/ipfs/${publicImageProps.hashLink}`
                  : '/images/audio-thumbnail.png',
              },
            },
          }}
        />
      )}

      {type === 'video' && (
        <ReactPlayer
          className="react-player"
          url={`https://ipfs.io/ipfs/${hashLink}`}
          width="100%"
          height="100%"
          controls
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                disablePictureInPicture: true,
                onContextMenu: (e: FormEvent) => e.preventDefault(),
              },
            },
          }}
        />
      )}
    </Container>
  )
}

export default memo(Visual)
