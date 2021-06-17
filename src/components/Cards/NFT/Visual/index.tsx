import Image from 'next/image'
import { FC, FormEvent, memo, useMemo, useState } from 'react'
import ReactPlayer from 'react-player/lazy'

import getImageLinkProps from '../../../../../utils/getImageLinkProps'
import { ImageWrapper, Play, StyledIcon } from './styles'

type Props = {
  privateImage?: string
  publicImage: string
  onClick: () => void
}

const Visual: FC<Props> = ({ publicImage, privateImage, onClick }) => {
  const publicImageProps = useMemo(
    () => getImageLinkProps(publicImage),
    [publicImage]
  )
  const privateImageProps = useMemo(
    () => (privateImage ? getImageLinkProps(privateImage) : undefined),
    [privateImage]
  )
  const [{ type, hashLink }, setImageProps] = useState(publicImageProps)

  return (
    <ImageWrapper
      type={type}
      onMouseEnter={() =>
        privateImageProps ? setImageProps(privateImageProps) : null
      }
      onMouseLeave={() =>
        !!privateImageProps ? setImageProps(publicImageProps) : null
      }
      onClick={onClick}
    >
      {type === 'image' && (
        <Image
          className="next-image"
          src={`https://ipfs.io/ipfs/${hashLink}`}
          layout="fill"
          objectFit="cover"
        />
      )}

      {type === 'audio' && (
        <StyledIcon name="headphones-duo" width={50} height={50} />
      )}

      {type === 'video' && (
        <>
          <Play name="circle-play-duo" width={50} height={50} />
          <ReactPlayer
            className="react-player"
            url={`https://ipfs.io/ipfs/${hashLink}`}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  disablePictureInPicture: true,
                  onContextMenu: (e: FormEvent) => e.preventDefault(),
                },
              },
            }}
            fallback={<div>Loading...</div>}
          />
        </>
      )}
    </ImageWrapper>
  )
}

export default memo(Visual)
