import { useEffect, useRef } from 'react'

export const useUpdateEffect = (
  effect: () => void,
  dependencies: unknown[] = []
): void => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export default useUpdateEffect
