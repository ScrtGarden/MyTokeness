import { FC, memo } from 'react'

import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from './styles'

type Props = {
  checked?: boolean
  onChange?: () => void
  id?: string
  disabled?: boolean
}

const Toggle: FC<Props> = ({
  checked,
  onChange = () => null,
  id,
  disabled,
}) => (
  <CheckBoxWrapper>
    <CheckBox
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <CheckBoxLabel htmlFor={id} disabled={disabled} />
  </CheckBoxWrapper>
)

export default memo(Toggle)
