import { useLocalStore } from 'easy-peasy'
import { memo } from 'react'

import { Content } from '../../UI/Containers'
import ContextStore from '../Store'
import Private from './Private'
import Public from './Public'

const Form = () => {
  // context store state
  const publicData = ContextStore.useStoreState((state) => state.publicMetadata)
  const privateData = ContextStore.useStoreState(
    (state) => state.privateMetadata
  )
  const hasError = ContextStore.useStoreState(
    (state) => state.validation.hasError
  )
  const errors = ContextStore.useStoreState((state) => state.validation.errors)

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
  const setSubmitted = ContextStore.useStoreActions(
    (actions) => actions.setHasSubmitted
  )

  const onSubmit = () => {
    setSubmitted(true)

    if (hasError) {
      return
    }
  }

  return (
    <Content>
      <Public
        data={publicData}
        setFile={setPublicFile}
        setData={setPublicData}
        setAttributes={setAttributes}
        errors={errors}
      />
      <Private
        data={privateData}
        setData={setPrivateData}
        setFile={setPrivateFile}
        onSubmit={onSubmit}
      />
    </Content>
  )
}

export default memo(Form)
