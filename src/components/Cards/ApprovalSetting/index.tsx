import { FC, memo, useEffect, useMemo, useReducer, useState } from 'react'

import { ExpirationReducer, UIExpiration } from '../../../../interface/nft-ui'
import reducer from '../../../../utils/reducer'
import { ValidationError } from '../../CollectionPage/Settings/Privacy/lib'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import ExpirationForm from '../../Common/ExpirationForm'
import { Header, SettingsCard } from '../../UI/Card'
import { Label, ToggleWrapper } from '../../UI/Forms'
import Toggle from '../../UI/Forms/Toggle'
import { Text } from '../../UI/Typography'
import { ButtonWrapper, Content } from './styles'

type Props = {
  title?: string
  description?: string
  isPrivate: boolean
  expiration: UIExpiration
  toggleId: string
  toggleLabel: string
  errors?: ValidationError
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
  errors,
  onSubmit,
  loading,
}) => {
  // component state
  const [isPrivateState, setIsPrivate] = useState(isPrivate)
  const [expSettings, setExpSettings] = useReducer<ExpirationReducer>(
    reducer,
    expiration
  )
  const [errorState, setErrorState] = useState(errors)

  // lifecycle
  useEffect(() => {
    setErrorState(undefined)
  }, [isPrivateState, expSettings])

  useEffect(() => {
    setExpSettings(expiration)
  }, [expiration])

  useEffect(() => {
    setIsPrivate(isPrivate)
  }, [isPrivate])

  useEffect(() => {
    setErrorState(errors)
  }, [errors])

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
            errors={errorState}
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
