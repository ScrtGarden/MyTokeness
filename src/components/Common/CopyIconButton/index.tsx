import { FC, memo } from 'react'

import useCopyToClipboard from '../../../hooks/useCopyToClipboard'
import { IconButton, StyledIcon } from '../../UI/Buttons'
import Tooltip from '../../UI/Tooltip'

type Props = {
  size?: 'small' | 'medium' | 'large'
  toCopy?: string
}

const CopyIconButton: FC<Props> = ({ size = 'medium', toCopy = '' }) => {
  const [status, copy] = useCopyToClipboard(toCopy, 1000)

  return (
    <Tooltip
      content={status === 'copied' ? 'copied!' : 'copy'}
      placement="top"
      hideOnClick={false}
    >
      <IconButton size={size} onClick={copy}>
        <StyledIcon
          name="copy-duo"
          width={size === 'small' ? 12 : 14}
          height={size === 'small' ? 12 : 14}
        />
      </IconButton>
    </Tooltip>
  )
}

export default memo(CopyIconButton)
