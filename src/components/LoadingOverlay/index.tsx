import { useStoreRehydrated } from 'easy-peasy'
import { FC, memo, useEffect } from 'react'

import useDocumentReady from '../../hooks/useDocumentReady'
import Spinner from '../UI/Loaders/Spinner'
import { Container } from './styles'

type Props = {
  onLoaded?: (value: boolean) => void
  className?: string
}

const LoadingOverlay: FC<Props> = ({ onLoaded = () => null, className }) => {
  const { ready } = useDocumentReady()
  const rehydrated = useStoreRehydrated()

  useEffect(() => {
    if (ready && rehydrated) {
      onLoaded(true)
    }
  }, [ready, rehydrated])

  return (
    <Container className={className}>
      <Spinner size={75} />
    </Container>
  )
}

export default memo(LoadingOverlay)
