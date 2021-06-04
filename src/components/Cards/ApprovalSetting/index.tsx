import { FC, memo, useEffect, useMemo, useReducer, useState } from 'react'

import { Expiration } from '../../../../interface/nft'
import { ExpirationReducer, UIExpiration } from '../../../../interface/nft-ui'
import reducer from '../../../../utils/reducer'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import ExpirationForm from '../../Common/ExpirationForm'
import { Header, SettingsCard } from '../../UI/Card'
import { Label, ToggleWrapper } from '../../UI/Forms'
import Toggle from '../../UI/Forms/Toggle'
import { Text } from '../../UI/Typography'
import { formatExpiration } from './lib'
import { ButtonWrapper, Content } from './styles'

type Props = {
  title?: string
  description?: string
  isPrivate: boolean
  expiration: Expiration
  toggleId: string
  toggleLabel: string
  error?: string
  onSubmit: (isPrivate: boolean, exp: UIExpiration) => void
  loading?: boolean
}

const ApprovalSetting: FC<Props> = ({
  title,
  description,
  toggleId,
  toggleLabel,
  isPrivate,
  expiration,
  error,
  onSubmit,
  loading,
}) => {
  // component state
  const [isPrivateState, setIsPrivate] = useState(isPrivate)
  const initialExp = useMemo(() => formatExpiration(expiration), [expiration])
  const [expSettings, setExpSettings] = useReducer<ExpirationReducer>(
    reducer,
    initialExp
  )
  const [errorState, setErrorState] = useState(error)

  // lifecycle
  useEffect(() => {
    if (error) {
      setErrorState('')
    }
  }, [isPrivateState, expSettings])

  useEffect(() => {
    setExpSettings(initialExp)
  }, [initialExp])

  useEffect(() => {
    setIsPrivate(isPrivate)
  }, [isPrivate])

  useEffect(() => {
    setErrorState(error)
  }, [error])

  return (
    <SettingsCard>
      <Header>{title}</Header>
      <Content>
        <Text>{description}</Text>
        <ToggleWrapper>
          <Toggle
            id={toggleId}
            checked={isPrivateState}
            onChange={() => setIsPrivate(!isPrivateState)}
          />
          <Label>{toggleLabel}</Label>
        </ToggleWrapper>
        {!isPrivateState && (
          <ExpirationForm
            settings={expSettings}
            onChange={setExpSettings}
            error={errorState}
          />
        )}
      </Content>
      <ButtonWrapper>
        <ButtonWithLoading
          width={56}
          text="Save"
          isPrimary
          onClick={() => onSubmit(isPrivateState, expSettings)}
          loading={loading}
        />
      </ButtonWrapper>
    </SettingsCard>
  )
}

export default memo(ApprovalSetting)
