import { FC, memo } from 'react'

import { ApprovalOptions, UIExpiration } from '../../../../../interface/nft-ui'
import ButtonWithLoading from '../../../Common/ButtonWithLoading'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Buttons } from '../../../UI/Card'
import { Field, Input, Label } from '../../../UI/Forms'
import Permissions from '../Permissions'
import { Container, Content } from './styles'

export type Props = {
  address: string
  setAddress: (value: string) => void
  options: ApprovalOptions
  setOptions: (data: Partial<ApprovalOptions>) => void
  expiration: UIExpiration
  setExpiration: (data: Partial<UIExpiration>) => void
  loading?: boolean
  onAdd: () => void
  errors: { address: string; expiration: string }
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
  errors,
}) => (
  <Container>
    <Content>
      <Field>
        <Label>Address</Label>
        <Input
          placeholder="secret1gvjcte2asddt09394s3r2aqhllgchg4608fmew"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
          validation={!!errors.address ? 'error' : undefined}
        />
        {errors.address && (
          <MessageWithIcon validation="error" message={errors.address} />
        )}
      </Field>
      <Permissions
        id="add"
        options={options}
        setOptions={setOptions}
        expiration={expiration}
        setExpiration={setExpiration}
        error={errors.expiration}
      />
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
