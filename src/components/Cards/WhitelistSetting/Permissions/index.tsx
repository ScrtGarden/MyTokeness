import { FC, memo } from 'react'

import { ApprovalOptions, UIExpiration } from '../../../../../interface/nft-ui'
import { ValidationError } from '../../../CollectionPage/Settings/Privacy/lib'
import ExpirationForm from '../../../Common/ExpirationForm'
import { Label, ToggleWrapper } from '../../../UI/Forms'
import Toggle from '../../../UI/Forms/Toggle'
import { Options } from './styles'

const TOGGLES = {
  hideOwnership: 'Hide ownership',
  hidePrivateMetadata: 'Hide private metadata',
  preventTransferPower: 'Prevent transfer power',
}

export type Props = {
  id: string
  options: ApprovalOptions
  setOptions: (data: Partial<ApprovalOptions>) => void
  expiration: UIExpiration
  setExpiration: (data: Partial<UIExpiration>) => void
  errors?: ValidationError
}

const Permissions: FC<Props> = ({
  id,
  options,
  setOptions,
  expiration,
  setExpiration,
  errors,
}) => {
  return (
    <>
      <Options>
        {Object.entries(TOGGLES).map(([value, label]) => (
          <ToggleWrapper key={value}>
            <Toggle
              id={`${id}-${value}`}
              checked={options[value]}
              onChange={() => setOptions({ [value]: !options[value] })}
            />
            <Label>{label}</Label>
          </ToggleWrapper>
        ))}
      </Options>
      {Object.values(options).some((value) => !value) && (
        <ExpirationForm
          settings={expiration}
          onChange={setExpiration}
          errors={errors}
        />
      )}
    </>
  )
}

export default memo(Permissions)
