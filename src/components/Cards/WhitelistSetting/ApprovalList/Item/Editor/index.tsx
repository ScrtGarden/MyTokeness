import { FC, memo } from 'react'

import {
  ApprovalOptions,
  UIExpiration,
} from '../../../../../../../interface/nft-ui'
import { ValidationError } from '../../../../../CollectionPage/Settings/Privacy/lib'
import ButtonWithLoading from '../../../../../Common/ButtonWithLoading'
import { Button } from '../../../../../UI/Buttons'
import Permissions from '../../../Permissions'
import { Buttons, Cell, Content, Wrapper } from './styles'

type Props = {
  options: ApprovalOptions
  expiration: UIExpiration
  setOptions: (data: Partial<ApprovalOptions>) => void
  setExpiration: (data: Partial<UIExpiration>) => void
  toggle: () => void
  toggleWarn: () => void
  errors?: ValidationError
  onClickSave: () => void
  loading?: boolean
}

const Editor: FC<Props> = (props) => {
  const {
    expiration,
    options,
    toggle,
    toggleWarn,
    setOptions,
    setExpiration,
    onClickSave,
    errors,
    loading,
  } = props

  return (
    <Cell colSpan={4}>
      <Content>
        <Permissions
          id="update"
          options={options}
          expiration={expiration}
          setOptions={setOptions}
          setExpiration={setExpiration}
          errors={errors}
        />
        <Buttons>
          <Button onClick={toggleWarn} isDanger>
            Remove
          </Button>
          <Wrapper>
            <Button onClick={toggle}>Cancel</Button>
            <ButtonWithLoading
              text="Save"
              isPrimary
              width={56}
              loading={loading}
              onClick={onClickSave}
            />
          </Wrapper>
        </Buttons>
      </Content>
    </Cell>
  )
}

export default memo(Editor)
