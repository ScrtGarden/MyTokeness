import { FC, memo } from 'react'

import { UIExpiration } from '../../../../../interface/nft-ui'
import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import ExpirationForm from '../../../Common/ExpirationForm'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Buttons } from '../../../UI/Card'
import { Field, Input, Label, ToggleWrapper } from '../../../UI/Forms'
import Toggle from '../../../UI/Forms/Toggle'
import { Container, Content, Options } from './styles'

export type Options = {
  hideOwnership: boolean
  hidePrivateMetadata: boolean
  preventTransferPower: boolean
  [key: string]: boolean
}

export type Props = {
  address: string
  setAddress: (value: string) => void
  options: Options
  setOptions: (data: Partial<Options>) => void
  expiration: UIExpiration
  setExpiration: (data: Partial<UIExpiration>) => void
  loading?: boolean
  onAdd: () => void
  addErrors: { address: string; expiration: string }
}

const TOGGLES = {
  hideOwnership: 'Hide ownership',
  hidePrivateMetadata: 'Hide private metadata',
  preventTransferPower: 'Prevent transfer power',
}

const AddNew: FC<Props> = ({
  address,
  setAddress,
  options,
  setOptions,
  expiration,
  setExpiration,
  onAdd,
  loading,
  addErrors,
}) => (
  <Container>
    <Content>
      <Field>
        <Label>Address</Label>
        <Input
          placeholder="secret1gvjcte2asddt09394s3r2aqhllgchg4608fmew"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
          validation={!!addErrors.address ? 'error' : undefined}
        />
        {addErrors.address && (
          <MessageWithIcon validation="error" message={addErrors.address} />
        )}
      </Field>
      <Options>
        {Object.entries(TOGGLES).map(([value, label]) => (
          <ToggleWrapper key={value}>
            <Toggle
              id={value}
              checked={options[value]}
              onChange={() => setOptions({ [value]: !options[value] })}
            />
            <Label>{label}</Label>
          </ToggleWrapper>
        ))}
      </Options>
      {Object.values(options).some((value) => !value) && (
        <ExpirationForm
          settings={expiration}
          onChange={setExpiration}
          error={addErrors.expiration}
        />
      )}
    </Content>
    <Buttons>
      <ButtonWithLoading
        text="Add"
        isPrimary
        width={51}
        loading={loading}
        onClick={onAdd}
      />
    </Buttons>
  </Container>
)

export default memo(AddNew)
