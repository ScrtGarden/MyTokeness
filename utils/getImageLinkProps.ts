import mime from 'mime-types'

import { hashLinkPattern } from './regexPatterns'

const getImageLinkProps = (link: string) => {
  const hashLink = link.match(hashLinkPattern)
  const mimeType = mime.lookup(link)

  return {
    type: mimeType ? mimeType.split('/')[0] : undefined,
    hashLink: hashLink ? hashLink[0] : '',
  }
}

export default getImageLinkProps
