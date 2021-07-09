import mime from 'mime-types'

import { decryptFile } from './fileEncryption'
import { hashLinkPattern } from './regexPatterns'

interface FileProps {
  type?: string
  hashLink: string
  src: string
}

const getFileProps = async (link: string, key?: string): Promise<FileProps> => {
  const hashMatch = link.match(hashLinkPattern)
  const hashLink = !!hashMatch ? hashMatch[0] : ''
  const mimeType = mime.lookup(link)
  const type = mimeType ? mimeType.split('/')[0] : undefined
  let src = `https://ipfs.io/ipfs/${hashLink}`

  if (key) {
    try {
      const base64 = await decryptFile(hashLink, key)
      if (type === 'image') {
        src = `data:${mimeType};base64,${base64}`
      } else if (type === 'audio') {
        src = `data:audio/mpeg;base64,${base64}`
      } else {
        src = `data:video/mp4;base64,${base64}`
      }
    } catch (error) {
      throw error
    }
  }

  return {
    type,
    hashLink,
    src,
  }
}

export default getFileProps
