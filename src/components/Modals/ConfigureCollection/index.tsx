import { FC, memo, useEffect, useReducer, useState } from 'react'

import reducer from '../../../../utils/reducer'
import { StyledIcon } from '../../UI/Buttons'
import { CloseButton, Content, Header, Title } from '../../UI/Modal'
import Form from './Form'
import { validate } from './lib'

export interface Config {
  publicTokenSupply: boolean
  publicOwner: boolean
  enableSealedMetadata: boolean
  unwrappedMetadataIsPrivate: boolean
  minterMayUpdateMetadata: boolean
  ownerMayUpdateMetadata: boolean
  enableBurn: boolean
  [key: string]: boolean
}

export interface Errors {
  name: string
  symbol: string
}

type ConfigReducer = (p: Config, u: Partial<Config>) => Config
type ErrorsReducer = (p: Errors, u: Partial<Errors>) => Errors

const CONFIGURATION = {
  publicTokenSupply: true,
  publicOwner: false,
  enableSealedMetadata: false,
  unwrappedMetadataIsPrivate: true,
  minterMayUpdateMetadata: false,
  ownerMayUpdateMetadata: false,
  enableBurn: false,
}

const ERRORS = { name: '', symbol: '' }

type Props = {
  toggle: () => void
}

const CreateCollectionModal: FC<Props> = ({ toggle }) => {
  // component state
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [config, setConfig] = useReducer<ConfigReducer>(reducer, CONFIGURATION)
  const [errors, setErrors] = useReducer<ErrorsReducer>(reducer, ERRORS)

  // lifecycle
  useEffect(() => {
    if (errors.name) {
      setErrors({ name: '' })
    }
  }, [name])

  useEffect(() => {
    if (errors.symbol) {
      setErrors({ symbol: '' })
    }
  }, [symbol])

  const onSubmit = () => {
    const { hasErrors, ...rest } = validate(name, symbol)
    setErrors(rest)

    if (hasErrors) {
      return
    }
  }

  return (
    <>
      <Header>
        <Title>Configure your collection</Title>
        <CloseButton onClick={toggle}>
          <StyledIcon name="times" />
        </CloseButton>
      </Header>
      <Content>
        <Form
          name={name}
          symbol={symbol}
          config={config}
          onChangeName={setName}
          onChangeSymbol={setSymbol}
          onChangeConfig={setConfig}
          errors={errors}
          onSubmit={onSubmit}
        />
      </Content>
    </>
  )
}

export default memo(CreateCollectionModal)
