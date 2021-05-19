import { FC, FormEvent, memo } from 'react'

import InputWithLoading from '../../Common/InputWithLoading'
import MessageWithIcon from '../../Common/MessageWithIcon'
import { Card, Header, Wrapper } from '../../UI/Card'
import { Field, Label } from '../../UI/Forms'

type Props = {
  value: string
  debouncedValue: string
  onChange?: (e: FormEvent<HTMLInputElement>) => void
  loading?: boolean
  error?: string
}

const Snip20Selector: FC<Props> = ({ value, onChange, loading, error }) => (
  <Card>
    <Header>Token Selector</Header>
    <Wrapper>
      <Field>
        <Label>Contract address</Label>
        <InputWithLoading value={value} onChange={onChange} loading={loading} />
        {error && <MessageWithIcon validation="error" message={error} />}
      </Field>
    </Wrapper>
  </Card>
)

export default memo(Snip20Selector)
