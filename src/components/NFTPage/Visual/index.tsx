import Image from 'next/image'
import { FC, FormEvent, memo } from 'react'
import ReactPlayer from 'react-player'
import { useQuery } from 'react-query'

import getFileProps from '../../../../utils/getFileProps'
import EmptyList from '../../EmptyList'
import Fingerprint from '../../UI/Loaders/Fingerprint'
import Spinner from '../../UI/Loaders/Spinner'
import { Container, DecryptText } from './styles'

type Props = {
  queryKey: string
  fileLink: string
  id: string
  contractAddress: string
  encryptionKey?: string
}

const Visual: FC<Props> = ({
  queryKey,
  fileLink,
  id,
  contractAddress,
  encryptionKey,
}) => {
  const { data, error, isLoading } = useQuery(
    [queryKey, contractAddress, id],
    () => getFileProps(fileLink, encryptionKey),
    { refetchOnWindowFocus: false, retry: false }
  )

  if (isLoading) {
    return (
      <Container>
        {encryptionKey ? (
          <>
            <Fingerprint size={200} />
            <DecryptText>Decrypting...</DecryptText>
          </>
        ) : (
          <Spinner />
        )}
      </Container>
    )
  }

  if (!data || !!error) {
    return (
      <Container>
        <EmptyList
          icon="sad-tear-duo"
          text="Oops! Looks like something went wrong."
        />
      </Container>
    )
  }

  const { type, src } = data
  return (
    <Container>
      {type === 'image' && (
        <Image src={src} layout="fill" objectFit="contain" alt="" />
      )}

      {type === 'audio' && (
        <ReactPlayer
          className="react-player"
          url={src}
          width="100%"
          height="unset"
          controls
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                disablePictureInPicture: true,
                onContextMenu: (e: FormEvent) => e.preventDefault(),
                poster: '/images/audio-thumbnail.png',
              },
            },
          }}
        />
      )}

      {type === 'video' && (
        <ReactPlayer
          className="react-player"
          url={src}
          width="100%"
          height="unset"
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
