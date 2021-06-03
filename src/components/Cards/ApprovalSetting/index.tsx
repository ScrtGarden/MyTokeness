import {
  FC,
  FormEvent,
  memo,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import DatePicker from 'react-datepicker'

import { Expiration } from '../../../../interface/nft'
import reducer from '../../../../utils/reducer'
import { blockheightPattern } from '../../../../utils/regexPatterns'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import MessageWithIcon from '../../Common/MessageWithIcon'
import { Header, SettingsCard } from '../../UI/Card'
import { DatePickerWrapper } from '../../UI/DatePicker'
import { Label } from '../../UI/Forms'
import { Radio } from '../../UI/Forms/Radio'
import Toggle from '../../UI/Forms/Toggle'
import { Text } from '../../UI/Typography'
import { FormatExpiration, formatExpiration } from './lib'
import {
  ButtonWrapper,
  Content,
  Field,
  StyledInput,
  StyledRadioGroup,
  ToggleWrapper,
  Wrapper,
} from './styles'

type Reducer = (p: FormatExpiration, u: FormatExpiration) => FormatExpiration

type Props = {
  title?: string
  description?: string
  isPrivate: boolean
  expiration: Expiration
  toggleId: string
  toggleLabel: string
  error?: string
  onSubmit: (isPrivate: boolean, exp: FormatExpiration) => void
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
  const [expSettings, setExpSettings] = useReducer<Reducer>(reducer, initialExp)
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

  const onChangeBlockheight = (e: FormEvent<HTMLInputElement>) => {
    const blockheight = e.currentTarget.value
    if (!blockheight || blockheight.match(blockheightPattern)) {
      setExpSettings({ blockheight })
    }
  }

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
          <Field>
            <Label>Expiration</Label>
            <StyledRadioGroup
              selectedValue={expSettings.type}
              onClick={(value) =>
                setExpSettings({ type: value as FormatExpiration['type'] })
              }
            >
              <Radio value="never" labelText="Never" isRegular />
              <Radio value="date" labelText="Date" isRegular />
              <Radio value="blockheight" labelText="Blockheight" isRegular />
            </StyledRadioGroup>
            {expSettings.type === 'blockheight' && (
              <Wrapper>
                <StyledInput
                  placeholder="3000000"
                  value={expSettings.blockheight}
                  onChange={onChangeBlockheight}
                />
                {errorState && (
                  <MessageWithIcon validation="error" message={errorState} />
                )}
              </Wrapper>
            )}
            {expSettings.type === 'date' && (
              <DatePickerWrapper>
                <DatePicker
                  selected={expSettings.date}
                  onChange={(date: Date) => setExpSettings({ date })}
                  customInput={<StyledInput />}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  showTimeInput
                  minDate={new Date()}
                />
                {errorState && (
                  <MessageWithIcon validation="error" message={errorState} />
                )}
              </DatePickerWrapper>
            )}
          </Field>
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
