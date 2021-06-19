import { FC, MouseEvent, memo, useCallback, useMemo } from 'react'

import Icon from '../../Icons'
import { Button, Container } from './styles'

type Props = {
  totalPages: number
  currentPage: number
  onChange: (page: number) => void
}

const Pagination: FC<Props> = ({ totalPages, currentPage, onChange }) => {
  const PAGES = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  )

  const secondFromLeftButtonValue = useMemo(
    () => (currentPage > 3 ? '...' : '2'),
    [currentPage]
  )

  const middleButtonValue = useMemo(() => {
    if (currentPage < 3) {
      return 3
    } else if (currentPage > totalPages - 2) {
      return totalPages - 2
    } else {
      return currentPage
    }
  }, [currentPage, totalPages])

  const secondFromRightButtonValue = useMemo(
    () => (currentPage < totalPages - 2 ? '...' : totalPages - 1),
    [currentPage, totalPages]
  )

  const onClickPage = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onChange(parseInt(e.currentTarget.value, 10))
    },
    [onChange]
  )

  return (
    <Container>
      <Button
        hide={currentPage === 1}
        onClick={() => onChange(Math.max(1, currentPage - 1))}
      >
        <Icon name="chevron-left" />
      </Button>

      {totalPages < 6 ? (
        PAGES.map((number) => (
          <Button
            key={number}
            selected={currentPage === number}
            value={number}
            onClick={onClickPage}
          >
            {number}
          </Button>
        ))
      ) : (
        <>
          <Button selected={currentPage === 1} value={1} onClick={onClickPage}>
            1
          </Button>
          <Button
            selected={currentPage === 2}
            value={secondFromLeftButtonValue}
            onClick={onClickPage}
            disabled={secondFromLeftButtonValue === '...'}
          >
            {secondFromLeftButtonValue}
          </Button>
          <Button
            selected={currentPage === middleButtonValue}
            value={middleButtonValue}
            onClick={onClickPage}
          >
            {middleButtonValue}
          </Button>
          <Button
            selected={currentPage === totalPages - 1}
            value={secondFromRightButtonValue}
            onClick={onClickPage}
            disabled={secondFromRightButtonValue === '...'}
          >
            {secondFromRightButtonValue}
          </Button>

          <Button
            selected={currentPage === totalPages}
            value={totalPages}
            onClick={onClickPage}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        hide={currentPage === totalPages}
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
      >
        <Icon name="chevron-right" />
      </Button>
    </Container>
  )
}

export default memo(Pagination)
