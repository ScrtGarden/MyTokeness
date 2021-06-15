import { FC, FormEvent, memo } from 'react'
import DatePicker from 'react-datepicker'

import { UIExpiration } from '../../../../interface/nft-ui'
import { DATE_FORMAT } from '../../../../utils/constants'
import { blockheightPattern } from '../../../../utils/regexPatterns'
import { ValidationError } from '../../CollectionPage/Settings/Privacy/lib'
import { DatePickerWrapper } from '../../UI/DatePicker'
import { Input, Label } from '../../UI/Forms'
import { Radio } from '../../UI/Forms/Radio'
import MessageWithIcon from '../MessageWithIcon'
import { Field, StyledRadioGroup, Wrapper } from './styles'

type Props = {
  settings: UIExpiration
  onChange: (data: Partial<UIExpiration>) => void
  errors?: ValidationError
}

const ExpirationForm: FC<Props> = ({ settings, onChange, errors }) => {
  const onChangeBlockheight = (e: FormEvent<HTMLInputElement>) => {
    const blockheight = e.currentTarget.value
    if (!blockheight || blockheight.match(blockheightPattern)) {
      onChange({ blockheight })
    }
  }

  return (
    <Field>
      <Label>Expiration</Label>
      <Wrapper>
        <StyledRadioGroup
          selectedValue={settings.type}
          onClick={(value) => onChange({ type: value as UIExpiration['type'] })}
        >
          <Radio value="never" labelText="Never" isRegular />
          <Radio value="date" labelText="Date" isRegular />
          <Radio value="blockheight" labelText="Blockheight" isRegular />
        </StyledRadioGroup>
        {errors?.option && (
          <MessageWithIcon validation="error" message={errors.option} />
        )}
      </Wrapper>
      {settings.type === 'blockheight' && (
        <Wrapper>
          <Input
            placeholder="3000000"
            value={settings.blockheight}
            onChange={onChangeBlockheight}
            validation={errors?.value ? 'error' : undefined}
          />
          {errors?.value && (
            <MessageWithIcon validation="error" message={errors.value} />
          )}
        </Wrapper>
      )}
      {settings.type === 'date' && (
        <DatePickerWrapper>
          <DatePicker
            selected={settings.date}
            onChange={(date: Date) => onChange({ date })}
            customInput={
              <Input validation={errors?.value ? 'error' : undefined} />
            }
            dateFormat={DATE_FORMAT}
            showTimeInput
            minDate={new Date()}
          />
          {errors?.value && (
            <MessageWithIcon validation="error" message={errors.value} />
          )}
        </DatePickerWrapper>
      )}
    </Field>
  )
}

export default memo(ExpirationForm)
