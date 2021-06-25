import { MouseEvent, useCallback, useEffect, useState } from 'react'

type CopyStatus = 'inactive' | 'copied' | 'failed'

const useCopyToClipboard = (
  text: string,
  notifyTimeout = 2500
): [CopyStatus, () => void] => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('inactive')
  const copy = useCallback(
    async (newText?: MouseEvent<HTMLButtonElement> | string) => {
      try {
        await navigator.clipboard.writeText(
          typeof newText === 'string' ? newText : text
        )
        setCopyStatus('copied')
      } catch (e) {
        setCopyStatus('failed')
      }
    },
    [text]
  )

  useEffect(() => {
    if (copyStatus === 'inactive') {
      return
    }

    const timeoutId = setTimeout(() => setCopyStatus('inactive'), notifyTimeout)

    return () => clearTimeout(timeoutId)
  }, [copyStatus, notifyTimeout])

  return [copyStatus, copy]
}

export default useCopyToClipboard
