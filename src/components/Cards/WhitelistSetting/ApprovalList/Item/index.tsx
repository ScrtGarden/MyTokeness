import { FC, memo, useEffect, useMemo, useReducer, useState } from 'react'
import { toast } from 'react-toastify'

import { SetWhitelistedApproval } from '../../../../../../interface/nft'
import {
  ApprovalOptionsReducer,
  ExpirationReducer,
  UISnip721Approval,
} from '../../../../../../interface/nft-ui'
import parseErrorMsg from '../../../../../../utils/parseErrorMsg'
import reducer from '../../../../../../utils/reducer'
import truncateAddress from '../../../../../../utils/truncateAddress'
import useMutationWhitelist from '../../../../../hooks/useMutationWhitelist'
import useToggle from '../../../../../hooks/useToggle'
import {
  ValidationError,
  formatAdd as format,
} from '../../../../CollectionPage/Settings/Privacy/lib'
import Warning from '../../../../Modals/Warning'
import { IconButton, StyledIcon } from '../../../../UI/Buttons'
import Dropdown from '../../../../UI/Dropdowns/Menu'
import { Modal } from '../../../../UI/Modal'
import { Row } from '../../../../UI/Table'
import Editor from './Editor'
import { parseData, validate } from './lib'
import Menu from './Menu'
import { Cell, StyledRow, Text } from './styles'

type Props = {
  item: UISnip721Approval
  isOpen?: boolean
  toggle: (address: string) => void
  contractAddress: string
  walletAddress: string
}

const Item: FC<Props> = ({
  item,
  isOpen,
  toggle,
  walletAddress,
  contractAddress,
}) => {
  const { address, transfer, viewOwner, viewPrivateMetadata, expiration } = item

  // component state
  const parsedData = useMemo(
    () => parseData(viewOwner, viewPrivateMetadata, transfer, expiration),
    [item]
  )
  const [localOptions, setLocalOptions] = useReducer<ApprovalOptionsReducer>(
    reducer,
    parsedData.options
  )
  const [localExpiration, setLocalExpiration] = useReducer<ExpirationReducer>(
    reducer,
    expiration
  )
  const [showMenu, toggleMenu] = useToggle()
  const [showWarn, toggleWarn] = useToggle()
  const [errors, setErrors] = useState<ValidationError | undefined>()

  // custom hooks
  const { mutate, isLoading } = useMutationWhitelist(
    walletAddress,
    contractAddress
  )

  // lifecycle
  useEffect(() => {
    setLocalOptions(parsedData.options)
  }, [parsedData])

  useEffect(() => {
    setLocalExpiration(expiration)
  }, [expiration])

  useEffect(() => {
    if (errors) {
      setErrors(undefined)
    }
  }, [localExpiration])

  const onClickEdit = () => {
    toggleMenu()
    toggle(address)
  }

  const onClickRemove = () => {
    toggleMenu()
    toggleWarn()
  }

  const onUpdate = (isSave?: boolean) => {
    let data: SetWhitelistedApproval = {
      address,
      view_owner: 'none',
      view_private_metadata: 'none',
      transfer: 'none',
    }

    if (isSave) {
      const { hasError, errors } = validate(localOptions, localExpiration)

      if (hasError) {
        setErrors(errors)
        return
      } else {
        data = format(address, localOptions, localExpiration)
      }
    }

    mutate(data, {
      onSuccess: () => {
        isSave ? toggle('') : toggleWarn()
        toast.success(
          isSave
            ? 'Updated whitelisted address privacy setting.'
            : 'Removed address from list.'
        )
      },
      onError: (error) => {
        toast.error(parseErrorMsg(error))
      },
    })
  }

  return (
    <>
      <StyledRow active={isOpen}>
        <Cell>
          <Text bold>{truncateAddress(address)}</Text>
        </Cell>
        <Cell>
          <Text>{parsedData.permissions}</Text>
        </Cell>
        <Cell>
          <Text>{parsedData.expirationLabel}</Text>
        </Cell>
        <Cell width={40}>
          <Dropdown
            isOpen={showMenu}
            toggle={!isOpen ? toggleMenu : () => toggle('')}
            content={
              <Menu onClickEdit={onClickEdit} onClickRemove={onClickRemove} />
            }
          >
            <IconButton>
              <StyledIcon name="ellipsis-v" width={25} height={25} />
            </IconButton>
          </Dropdown>
        </Cell>
      </StyledRow>
      {isOpen && (
        <Row>
          <Editor
            expiration={localExpiration}
            options={localOptions}
            toggle={() => toggle(address)}
            toggleWarn={toggleWarn}
            setExpiration={setLocalExpiration}
            setOptions={setLocalOptions}
            onClickSave={() => onUpdate(true)}
            errors={errors}
            loading={isLoading && !showWarn}
          />
        </Row>
      )}
      <Modal isOpen={showWarn} onBackgroundClick={toggleWarn}>
        <Warning
          title="Remove address from whitelist"
          text={`The following address, ${truncateAddress(
            address
          )}, will be permanently deleted. Are you sure you want to continue?`}
          onClickPrimary={() => onUpdate()}
          toggle={toggleWarn}
          loading={isLoading}
          buttonWidth={79}
        />
      </Modal>
    </>
  )
}

export default memo(Item)
