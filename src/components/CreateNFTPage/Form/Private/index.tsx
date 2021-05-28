import { FC, memo } from 'react'

import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Field, Label, Textarea } from '../../../UI/Forms'
import { PrivateMetadata } from '../../Store/model'
import FileUploader from '../FileUploader'

type Props = {
  data: PrivateMetadata
  setData: (data: Partial<PrivateMetadata>) => void
  setFile: (file: File | undefined) => void
  onSubmit: () => void
}

const Private: FC<Props> = ({ data, setData, setFile, onSubmit }) => (
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
          value={data.content}
          onChange={(e) => setData({ content: e.currentTarget.value })}
        />
      </Field>
      <ButtonWithLoading text="Create" isPrimary onClick={onSubmit} />
    </Wrapper>
  </Card>
)

export default memo(Private)
