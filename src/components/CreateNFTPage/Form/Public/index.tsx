import { memo } from 'react'

import { Card, Header, Wrapper } from '../../../UI/Card'
import ContextStore from '../../Store'
import FileUploader from '../FileUploader'

const Public = () => {
  // context store state
  const file = ContextStore.useStoreState((state) => state.publicFile)

  // context store actions
  const setFile = ContextStore.useStoreActions(
    (actions) => actions.setPublicFile
  )

  return (
    <Card>
      <Header>Public Data</Header>
      <Wrapper>
        <FileUploader file={file} setFile={setFile} />
      </Wrapper>
    </Card>
  )
}

export default memo(Public)
