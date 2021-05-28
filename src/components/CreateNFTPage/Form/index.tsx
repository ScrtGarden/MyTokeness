import { useLocalStore } from 'easy-peasy'
import { memo } from 'react'

import { Content } from '../../UI/Containers'
import ContextStore from '../Store'
import Private from './Private'
import Public from './Public'

const Form = () => {
  // context store state
  const publicData = ContextStore.useStoreState((state) => state.publicMetadata)
  const publicFile = ContextStore.useStoreState((state) => state.publicFile)
  const privateData = ContextStore.useStoreState(
    (state) => state.privateMetadata
  )
  const privateFile = ContextStore.useStoreState((state) => state.privateFile)

  // context store actions
  const setPublicFile = ContextStore.useStoreActions(
    (actions) => actions.setPublicFile
  )
  const setPublicData = ContextStore.useStoreActions(
    (actions) => actions.setPublicMetadata
  )
  const setAttributes = ContextStore.useStoreActions(
    (actions) => actions.setAttributes
  )
  const setPrivateFile = ContextStore.useStoreActions(
    (actions) => actions.setPrivateFile
  )
  const setPrivateData = ContextStore.useStoreActions(
    (actions) => actions.setPrivateMetadata
  )

  return (
    <Content>
      <Public
        data={publicData}
        setFile={setPublicFile}
        setData={setPublicData}
        setAttributes={setAttributes}
      />
      <Private
        data={privateData}
        setData={setPrivateData}
        setFile={setPrivateFile}
        // onSubmit={onSubmit}
      />
    </Content>
  )
}

export default memo(Form)
