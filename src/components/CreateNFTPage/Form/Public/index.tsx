import { FormEvent, memo } from 'react'

import { decimalsPattern } from '../../../../../utils/regexPatterns'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { Field, Hint, Input, Label, Textarea } from '../../../UI/Forms'
import ContextStore from '../../Store'
import AttributeList from '../AttributeList'
import FileUploader from '../FileUploader'

const Public = () => {
  // context store state
  const name = ContextStore.useStoreState((state) => state.publicMetadata.name)
  const description = ContextStore.useStoreState(
    (state) => state.publicMetadata.description
  )
  const supply = ContextStore.useStoreState(
    (state) => state.publicMetadata.supply
  )
  const attributes = ContextStore.useStoreState(
    (state) => state.publicMetadata.attributes
  )

  // context store actions
  const setFile = ContextStore.useStoreActions(
    (actions) => actions.setPublicFile
  )
  const setData = ContextStore.useStoreActions(
    (actions) => actions.setPublicMetadata
  )
  const setAttributes = ContextStore.useStoreActions(
    (actions) => actions.setAttributes
  )

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
        <FileUploader setFile={setFile} />
        <Field>
          <Label>Name</Label>
          <Input
            placeholder="Charmander"
            value={name}
            onChange={(e) => setData({ name: e.currentTarget.value })}
          />
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
        <AttributeList data={attributes} onChange={setAttributes} />
      </Wrapper>
    </Card>
  )
}

export default memo(Public)
