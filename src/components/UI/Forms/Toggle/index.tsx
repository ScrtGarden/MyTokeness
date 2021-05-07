import { FC, memo } from 'react'

import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from './styles'

type Props = {
  checked?: boolean
  onChange?: () => void
  id?: string
}

const Toggle: FC<Props> = ({ checked, onChange = () => null, id }) => (
  <CheckBoxWrapper>
    <CheckBox id={id} type="checkbox" checked={checked} onChange={onChange} />
    <CheckBoxLabel htmlFor={id} />
  </CheckBoxWrapper>
)

export default memo(Toggle)
