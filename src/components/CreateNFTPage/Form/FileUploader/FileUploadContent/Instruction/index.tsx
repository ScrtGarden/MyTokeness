import { FC, memo } from 'react'

import { Container, StyledIcon, Text } from './styles'

type Props = {
  isDragActive?: boolean
  isDragAccept?: boolean
  isDragReject?: boolean
}

const Instruction: FC<Props> = (props) => {
  const { isDragAccept, isDragActive, isDragReject } = props

  return (
    <Container>
      <StyledIcon
        name={isDragActive && isDragAccept ? 'fire-duo' : 'photo-video-duo'}
      />
      {!isDragActive && <Text>Choose a file or drag and drop here</Text>}
      {isDragActive && isDragAccept && <Text>Drop it like it&apos;s hot!</Text>}
      {isDragActive && isDragReject && <Text>Wrong file type</Text>}
    </Container>
  )
}

export default memo(Instruction)
