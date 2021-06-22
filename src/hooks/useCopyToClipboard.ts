import { MouseEvent, useCallback, useEffect, useState } from 'react'

const useCopyToClipboard = (text: string, notifyTimeout = 2500) => {
  const [copyStatus, setCopyStatus] = useState('inactive')
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

  return [copyStatus, copy] as const
}

export default useCopyToClipboard
