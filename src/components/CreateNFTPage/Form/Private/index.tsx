import { FC, memo } from 'react'

import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Field, Label, Textarea } from '../../../UI/Forms'
import ContextStore from '../../Store'
import FileUploader from '../FileUploader'

type Props = {
  onSubmit: () => void
  loading?: boolean
}

const Private: FC<Props> = ({ onSubmit, loading }) => {
  // context store state
  const content = ContextStore.useStoreState(
    (state) => state.privateMetadata.content
  )
  const file = ContextStore.useStoreState((state) => state.privateFile)

  // context store actions
  const setFile = ContextStore.useStoreActions(
    (actions) => actions.setPrivateFile
  )
  const setData = ContextStore.useStoreActions(
    (actions) => actions.setPrivateMetadata
  )

  return (
    <Card>
      <Header>Owner's Eyes Only</Header>
      <Wrapper>
        <FileUploader
          file={file}
          label="Image, Video or Audio (optional)"
          setFile={setFile}
        />
        <Field>
          <Label>Content (optional)</Label>
          <Textarea
            rows={5}
            placeholder="Access key, code to nuclear warheads, link to file, etc...Charmander can be found outside of rock tunnel in fire red."
            value={content}
            onChange={(e) => setData({ content: e.currentTarget.value })}
          />
        </Field>
        <ButtonWithLoading
          text="Create"
          isPrimary
          onClick={onSubmit}
          loading={loading}
        />
      </Wrapper>
    </Card>
  )
}

export default memo(Private)
