import Image from 'next/image'
import { FC, FormEvent, memo } from 'react'
import ReactPlayer from 'react-player'
import { useQuery } from 'react-query'

import getFileProps from '../../../../../utils/getFileProps'
import EmptyList from '../../../EmptyList'
import Fingerprint from '../../../UI/Loaders/Fingerprint'
import Spinner from '../../../UI/Loaders/Spinner'
import { DecryptText, ImageWrapper, Play, StyledIcon } from './styles'

type Props = {
  queryKey: string
  fileLink?: string
  onClick: () => void
  id: string
  contractAddress: string
  encryptionKey?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const Visual: FC<Props> = ({
  queryKey,
  fileLink,
  encryptionKey,
  onClick,
  id,
  contractAddress,
  onMouseEnter = () => null,
  onMouseLeave = () => null,
}) => {
  const { data, error, isLoading } = useQuery(
    [queryKey, contractAddress, id],
    () => getFileProps(fileLink as string, encryptionKey),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  )

  if (isLoading) {
    return (
      <ImageWrapper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {encryptionKey ? (
          <>
            <Fingerprint size={200} />
            <DecryptText>Decrypting...</DecryptText>
          </>
        ) : (
          <Spinner />
        )}
      </ImageWrapper>
    )
  }

  if (!data || !!error) {
    return (
      <ImageWrapper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <EmptyList
          icon="sad-tear-duo"
          text="Oops! Looks like something went wrong."
        />
      </ImageWrapper>
    )
  }

  const { type, src } = data
  return (
    <ImageWrapper
      type={type}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {type === 'image' && (
        <Image
          className="next-image"
          src={src}
          layout="fill"
          objectFit="cover"
          alt=""
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
            url={src}
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
          />
        </>
      )}
    </ImageWrapper>
  )
}

export default memo(Visual)
