import { FormEvent, memo } from 'react'

import { NFT_CATEGORIES } from '../../../../../utils/constants'
import { supplyPattern } from '../../../../../utils/regexPatterns'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Card, Header, Wrapper } from '../../../UI/Card'
import { StyledSelect } from '../../../UI/Forms'
import { Field, Hint, Input, Label, Textarea } from '../../../UI/Forms'
import ContextStore from '../../Store'
import { CategoryItem } from '../../Store/model'
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
  const categories = ContextStore.useStoreState(
    (state) => state.publicMetadata.categories
  )
  const file = ContextStore.useStoreState((state) => state.publicFile)
  const errors = ContextStore.useStoreState((state) => state.validation.errors)

  // context store actions
  const setData = ContextStore.useStoreActions(
    (actions) => actions.setPublicMetadata
  )
  const setAttributes = ContextStore.useStoreActions(
    (actions) => actions.setAttributes
  )
  const setFile = ContextStore.useStoreActions(
    (actions) => actions.setPublicFile
  )
  const setCategories = ContextStore.useStoreActions(
    (actions) => actions.setCategories
  )

  const onChangeSupply = (e: FormEvent<HTMLInputElement>) => {
    const amount = e.currentTarget.value
    if (!amount || amount.match(supplyPattern)) {
      setData({ supply: amount })
    }
  }

  return (
    <Card>
      <Header>Public Data</Header>
      <Wrapper>
        <FileUploader file={file} setFile={setFile} error={errors.publicFile} />
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
          <Label>Categories (optional)</Label>
          <StyledSelect
            classNamePrefix="select"
            options={NFT_CATEGORIES}
            isMulti
            value={categories}
            onChange={(value: CategoryItem[]) => setCategories(value)}
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
