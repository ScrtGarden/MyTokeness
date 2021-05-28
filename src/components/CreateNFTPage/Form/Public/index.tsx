import { FC, FormEvent, memo } from 'react'

import { decimalsPattern } from '../../../../../utils/regexPatterns'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Field, Hint, Input, Label, Textarea } from '../../../UI/Forms'
import { PublicMetadata, SetAttributePayload } from '../../Store/model'
import AttributeList from '../AttributeList'
import FileUploader from '../FileUploader'

type Props = {
  data: PublicMetadata
  setData: (data: Partial<PublicMetadata>) => void
  setFile: (file: File | undefined) => void
  setAttributes: (data: SetAttributePayload) => void
  errors: { name: string; publicFile: string; attributes: string[] }
}

const Public: FC<Props> = ({
  data,
  setAttributes,
  setData,
  setFile,
  errors,
}) => {
  const { name, description, supply, attributes } = data

  const onChangeSupply = (e: FormEvent<HTMLInputElement>) => {
    const amount = e.currentTarget.value
    if (!amount || amount.match(decimalsPattern)) {
      setData({ supply: amount })
    }
  }

  return (
    <Card>
      <Header>Public Data</Header>
      <Wrapper>
        <FileUploader setFile={setFile} error={errors.publicFile} />
        <Field>
          <Label>Name</Label>
          <Input
            placeholder="Charmander"
            value={name}
            onChange={(e) => setData({ name: e.currentTarget.value })}
            validation={errors.name ? 'error' : undefined}
          />
          {errors.name && (
            <MessageWithIcon validation="error" message={errors.name} />
          )}
        </Field>
        <Field>
          <Label>Description (optional)</Label>
          <Hint>Markdown syntax is supported.</Hint>
          <Textarea
            placeholder="Charmander is a bipedal, reptilian Pokémon with a primarily orange body and blue eyes."
            rows={5}
            value={description}
            onChange={(e) => setData({ description: e.currentTarget.value })}
          />
        </Field>
        <Field>
          <Label>Number of copies</Label>
          <Input
            value={supply}
            onChange={onChangeSupply}
            onBlur={() => !supply && setData({ supply: '1' })}
          />
        </Field>
        <AttributeList
          data={attributes}
          onChange={setAttributes}
          errors={errors.attributes}
        />
      </Wrapper>
    </Card>
  )
}

export default memo(Public)
