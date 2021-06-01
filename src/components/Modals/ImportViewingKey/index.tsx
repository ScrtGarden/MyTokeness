import { FC, memo, useState } from 'react'

import Icon from '../../Icons'
import { Button } from '../../UI/Buttons'
import { Field, Input, Label } from '../../UI/Forms'
import { Buttons, CloseButton, Content, Header, Title } from '../../UI/Modal'

type Props = {
  toggle: () => void
  onClickPrimary: (value: string) => void
}

const ImportViewingKeyModal: FC<Props> = (props) => {
  const { toggle, onClickPrimary } = props

  const [newKey, setNewKey] = useState('')

  return (
    <>
      <Header>
        <Title>Import viewing key</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      <Content>
        <Field>
          <Label>Viewing Key</Label>
          <Input
            autoFocus
            value={newKey}
            onChange={(e) => setNewKey(e.currentTarget.value)}
          />
        </Field>
      </Content>
      <Buttons>
        <Button onClick={toggle}>Cancel</Button>
        <Button onClick={() => onClickPrimary(newKey)} isPrimary>
          Import
        </Button>
      </Buttons>
    </>
  )
}

export default memo(ImportViewingKeyModal)
