import { FC, memo, useEffect, useReducer, useState } from 'react'

import { ExpirationReducer, UIExpiration } from '../../../../interface/nft-ui'
import reducer from '../../../../utils/reducer'
import { ValidationError } from '../../CollectionPage/Settings/Privacy/lib'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import ExpirationForm from '../../Common/ExpirationForm'
import Icon from '../../Icons'
import { Button } from '../../UI/Buttons'
import { Label, ToggleWrapper } from '../../UI/Forms'
import Toggle from '../../UI/Forms/Toggle'
import { Buttons, CloseButton, Header, Title } from '../../UI/Modal'
import { Text } from '../../UI/Typography'
import { StyledContent } from './styles'

export type Props = {
  title: string
  description?: string
  id: string
  toggle: () => void
  isPrivate: boolean
  expiration: UIExpiration
  errors?: ValidationError
  toggleLabel?: string
  onSubmit: (isPrivate: boolean, expiration: UIExpiration) => void
  loading?: boolean
}

const ApprovalPrivacySetting: FC<Props> = ({
  toggle,
  id,
  title,
  description,
  isPrivate,
  expiration,
  errors,
  toggleLabel,
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
    <>
      <Header>
        <Title>{title}</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      <StyledContent>
        <Text>{description}</Text>
        <ToggleWrapper>
          <Toggle
            id={id}
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
      </StyledContent>
      <Buttons>
        <Button onClick={toggle}>Cancel</Button>
        <ButtonWithLoading
          text="Save"
          onClick={() => onSubmit(isPrivateState, expSettings)}
          isPrimary
          width={56}
          loading={loading}
        />
      </Buttons>
    </>
  )
}

export default memo(ApprovalPrivacySetting)
