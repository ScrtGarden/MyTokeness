import { FC, memo, useEffect, useReducer } from 'react'

import {
  ApprovalOptions,
  ApprovalOptionsReducer,
  ExpirationReducer,
  UIExpiration,
} from '../../../../../../../interface/nft-ui'
import reducer from '../../../../../../../utils/reducer'
import ButtonWithLoading from '../../../../../Common/ButtonWithLoading'
import { Button } from '../../../../../UI/Buttons'
import Permissions from '../../../Permissions'
import { Buttons, Cell, Content, Wrapper } from './styles'

type Props = {
  options: ApprovalOptions
  expiration: UIExpiration
  toggle: () => void
}

const Editor: FC<Props> = (props) => {
  const { expiration, options, toggle } = props

  // component state
  const [localOptions, setLocalOptions] = useReducer<ApprovalOptionsReducer>(
    reducer,
    options
  )
  const [localExpiration, setLocalExpiration] = useReducer<ExpirationReducer>(
    reducer,
    expiration
  )

  // lifecycle
  useEffect(() => {
    setLocalOptions(options)
  }, [options])

  useEffect(() => {
    setLocalExpiration(expiration)
  }, [expiration])

  return (
    <Cell colSpan={4}>
      <Content>
        <Permissions
          id="update"
          options={localOptions}
          expiration={localExpiration}
          setOptions={setLocalOptions}
          setExpiration={setLocalExpiration}
        />
        <Buttons>
          <ButtonWithLoading text="Remove" isDanger />
          <Wrapper>
            <Button onClick={toggle}>Cancel</Button>
            <ButtonWithLoading text="Save" isPrimary />
          </Wrapper>
        </Buttons>
      </Content>
    </Cell>
  )
}

export default memo(Editor)
