import { FC, memo, useEffect, useReducer, useState } from 'react'

import { ExpirationReducer, UIExpiration } from '../../../../interface/nft-ui'
import reducer from '../../../../utils/reducer'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import ExpirationForm from '../../Common/ExpirationForm'
import Icon from '../../Icons'
import { Button } from '../../UI/Buttons'
import { Label, ToggleWrapper } from '../../UI/Forms'
import Toggle from '../../UI/Forms/Toggle'
import { Buttons, CloseButton, Content, Header, Title } from '../../UI/Modal'
import { Text } from '../../UI/Typography'
import { StyledContent } from './styles'

export type Props = {
  title: string
  description?: string
  id: string
  toggle: () => void
  isPrivate: boolean
  expiration: UIExpiration
  error?: string
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
  error,
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
  const [errorState, setErrorState] = useState(error)

  // lifecycle
  useEffect(() => {
    if (error) {
      setErrorState('')
    }
  }, [isPrivateState, expSettings])

  useEffect(() => {
    setExpSettings(expiration)
  }, [expiration])

  useEffect(() => {
    setIsPrivate(isPrivate)
  }, [isPrivate])

  useEffect(() => {
    setErrorState(error)
  }, [error])

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
            error={errorState}
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
