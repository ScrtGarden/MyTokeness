import { FC } from 'react'

import { Config } from '../../../../../interface/nft-ui'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import { Header, Wrapper } from '../../../UI/Card'
import { Field, Hint, Input, Label, ToggleField } from '../../../UI/Forms'
import Toggle from '../../../UI/Forms/Toggle'
import { StyledButton } from './styles'
import { Errors } from '..'

type Props = {
  name: string
  symbol: string
  config: Config
  errors: Errors
  onChangeName: (value: string) => void
  onChangeSymbol: (value: string) => void
  onChangeConfig: (data: Partial<Config>) => void
  onSubmit: () => void
  loading?: boolean
}

const CONFIGURATION_OPTIONS = {
  publicTokenSupply: {
    label: 'Public token supply',
    hint: '',
  },
  publicOwner: {
    label: 'Public owner',
    hint: 'Indicates whether token ownership is public or private.',
  },
  enableSealedMetadata: {
    label: 'Enable sealed metadata',
    hint: 'The private metadata of a minted token is not viewable by anyone, noteven the owner, until the owner unwraps it.',
  },
  unwrappedMetadataIsPrivate: {
    label: 'Unwrapped metadata is private',
    hint: 'Indicates whether sealed metadata remains private after unwrapping.',
  },
  minterMayUpdateMetadata: { label: 'Minter may update metadata', hint: '' },
  ownerMayUpdateMetadata: { label: 'Owner may update metadata', hint: '' },
  enableBurn: {
    label: 'Enable burn',
    hint: '',
  },
}

const Form: FC<Props> = ({
  name,
  symbol,
  config,
  errors,
  onChangeName,
  onChangeSymbol,
  onChangeConfig,
  onSubmit,
  loading,
}) => (
  <>
    <Header>Details</Header>
    <Wrapper>
      <Field>
        <Label>Name</Label>
        <Input
          placeholder="My Awesome Collection"
          value={name}
          onChange={(e) => onChangeName(e.currentTarget.value)}
          validation={errors.name ? 'error' : undefined}
        />
        {errors.name && (
          <MessageWithIcon validation="error" message={errors.name} />
        )}
      </Field>
      <Field>
        <Label>Symbol</Label>
        <Input
          placeholder="MYAWE"
          value={symbol}
          onChange={(e) => onChangeSymbol(e.currentTarget.value)}
          validation={errors.symbol ? 'error' : undefined}
          uppercase
        />
        {errors.symbol && (
          <MessageWithIcon validation="error" message={errors.symbol} />
        )}
      </Field>
    </Wrapper>
    <Header margin>Configuration</Header>
    <Wrapper>
      {Object.entries(CONFIGURATION_OPTIONS).map(([key, value]) => (
        <Field key={key}>
          <ToggleField>
            <Label>{value.label}</Label>
            <Toggle
              id={key}
              checked={config[key]}
              onChange={() => onChangeConfig({ [key]: !config[key] })}
            />
          </ToggleField>
          {value.hint && <Hint>{value.hint}</Hint>}
        </Field>
      ))}
    </Wrapper>
    <StyledButton
      text="Create"
      isStretched
      isPrimary
      onClick={onSubmit}
      loading={loading}
    />
  </>
)

export default Form
