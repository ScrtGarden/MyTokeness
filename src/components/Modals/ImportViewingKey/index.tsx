import { FC, memo, useEffect, useState } from 'react'

import ButtonWithLoading from '../../Common/ButtonWithLoading'
import MessageWithIcon from '../../Common/MessageWithIcon'
import Icon from '../../Icons'
import { Button } from '../../UI/Buttons'
import { Field, Input, Label } from '../../UI/Forms'
import { Buttons, CloseButton, Content, Header, Title } from '../../UI/Modal'

type Props = {
  toggle: () => void
  onClickPrimary: (value: string) => void
  loading?: boolean
}

const ImportViewingKeyModal: FC<Props> = (props) => {
  const { toggle, onClickPrimary, loading } = props

  const [newKey, setNewKey] = useState('')
  const [error, setError] = useState('')

  const onClick = () => {
    if (!newKey) {
      setError('Please enter a valid key.')
      return
    }

    onClickPrimary(newKey)
  }

  useEffect(() => {
    setError('')
  }, [newKey])

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
            validation={error ? 'error' : undefined}
          />
          {error && <MessageWithIcon validation="error" message={error} />}
        </Field>
      </Content>
      <Buttons>
        <Button onClick={toggle}>Cancel</Button>
        <ButtonWithLoading
          text="Import"
          onClick={onClick}
          isPrimary
          width={71}
          loading={loading}
        />
      </Buttons>
    </>
  )
}

export default memo(ImportViewingKeyModal)
