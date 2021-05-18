import { FC, FormEvent, memo, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import {
  QueryTokenConfig,
  ResultTokenConfig,
} from '../../../../interface/snip20'
import useQueryContract from '../../../hooks/useQueryContract'
import InputWithLoading from '../../Common/InputWithLoading'
import MessageWithIcon from '../../Common/MessageWithIcon'
import { Card, Header, Wrapper } from '../../UI/Card'
import { Field, Label } from '../../UI/Forms'

type Props = {
  value: string
  debouncedValue: string
  onChange?: (e: FormEvent<HTMLInputElement>) => void
  checkFor?: 'mint' | 'burn'
}

const Snip20Selector: FC<Props> = ({
  value,
  debouncedValue,
  onChange,
  checkFor,
}) => {
  const queryClient = useQueryClient()

  // component state
  const [error, setError] = useState('')

  // custom hook
  const { isLoading } = useQueryContract<QueryTokenConfig, ResultTokenConfig>(
    ['tokenConfig', debouncedValue],
    debouncedValue,
    { token_config: {} },
    {
      enabled: !!debouncedValue,
      refetchOnWindowFocus: false,
      retry: 1,
      onSuccess: (data) => {
        queryClient.setQueryData('selectedContractAddress', debouncedValue)
        if (checkFor) {
          if (checkFor === 'mint' && !data.token_config.mint_enabled) {
            setError('Mint function is disabled.')
          } else if (checkFor === 'burn' && !data.token_config.burn_enabled) {
            setError('Burn function is disabled.')
          }
        }
      },
      onError: (error) => {
        setError('Unable to fetch token information.')
      },
    }
  )

  // lifecycle
  useEffect(() => {
    setError('')
  }, [debouncedValue])

  return (
    <Card>
      <Header>Token Selector</Header>
      <Wrapper>
        <Field>
          <Label>Contract address</Label>
          <InputWithLoading
            value={value}
            onChange={onChange}
            loading={isLoading}
          />
          {error && <MessageWithIcon validation="error" message={error} />}
        </Field>
      </Wrapper>
    </Card>
  )
}

export default memo(Snip20Selector)
