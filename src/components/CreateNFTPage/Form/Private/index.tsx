import { memo } from 'react'

import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Field, Label, Textarea } from '../../../UI/Forms'
import ContextStore from '../../Store'
import FileUploader from '../FileUploader'

const Private = () => {
  // context store state
  const content = ContextStore.useStoreState(
    (state) => state.privateMetadata.content
  )

  // context store actions
  const setFile = ContextStore.useStoreActions(
    (actions) => actions.setPrivateFile
  )
  const setContent = ContextStore.useStoreActions(
    (actions) => actions.setPrivateMetadata
  )

  return (
    <Card>
      <Header>Owner's Eyes Only</Header>
      <Wrapper>
        <FileUploader
          label="Image, Video or Audio (optional)"
          setFile={setFile}
        />
        <Field>
          <Label>Content (optional)</Label>
          <Textarea
            rows={5}
            placeholder="Access key, code to nuclear warheads, link to file, etc...Charmander can be found outside of rock tunnel in fire red."
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
          />
        </Field>
        <ButtonWithLoading text="Create" isPrimary />
      </Wrapper>
    </Card>
  )
}

export default memo(Private)
