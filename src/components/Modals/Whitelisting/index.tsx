import { FC, memo, useEffect, useReducer, useState } from 'react'
import { toast } from 'react-toastify'

import {
  ApprovalOptions,
  ApprovalOptionsReducer,
  ExpirationReducer,
  UIExpiration,
  UISnip721Approval,
} from '../../../../interface/nft-ui'
import parseErrorMsg from '../../../../utils/parseErrorMsg'
import reducer from '../../../../utils/reducer'
import useMutationWhitelist from '../../../hooks/useMutationWhitelist'
import AddNew from '../../Cards/WhitelistSetting/AddNew'
import ApprovalList from '../../Cards/WhitelistSetting/ApprovalList'
import {
  formatWhitelistAdd as format,
  validateWhitelistAdd as validate,
} from '../../CollectionPage/Settings/Privacy/lib'
import Icon from '../../Icons'
import { Header as Separator } from '../../UI/Card'
import { CloseButton, Content, Header, Title } from '../../UI/Modal'
import { Text } from '../../UI/Typography'
import { Wrapper } from './styles'

type Props = {
  toggle: () => void
  tokenId: string
  walletAddress: string
  contractAddress: string
  approvedList: UISnip721Approval[]
}

const OPTIONS: ApprovalOptions = {
  hideOwnership: true,
  hidePrivateMetadata: true,
  preventTransferPower: true,
}

const EXPIRATION: UIExpiration = {
  type: '',
  date: new Date(),
  blockheight: '',
}

const WhitelistingModal: FC<Props> = ({
  toggle,
  tokenId,
  walletAddress,
  contractAddress,
  approvedList,
}) => {
  // component state
  const [address, setAddress] = useState('')
  const [options, setOptions] = useReducer<ApprovalOptionsReducer>(
    reducer,
    OPTIONS
  )
  const [expiration, setExpiration] = useReducer<ExpirationReducer>(
    reducer,
    EXPIRATION
  )
  const [addErrors, setAddErrors] = useState({
    address: '',
    option: '',
    value: '',
  })

  // custom hook
  const { mutate, isLoading } = useMutationWhitelist(
    walletAddress,
    contractAddress
  )

  // lifecycle
  useEffect(() => {
    setAddErrors((prev) => ({ ...prev, address: '' }))
  }, [address])

  useEffect(() => {
    setAddErrors((prev) => ({ ...prev, option: '', value: '' }))
  }, [expiration])

  const onWhitelistAdd = () => {
    const { hasError, errors } = validate(address, options, expiration)

    setAddErrors(errors)

    if (hasError) {
      return
    }

    const data = format(address, options, expiration, { tokenId })

    mutate(data, {
      onSuccess: () => {
        setAddress('')
        setOptions(OPTIONS)
        setExpiration(EXPIRATION)
        toast.success('Added address to whitelist.')
      },
      onError: (error) => {
        toast.error(parseErrorMsg(error))
      },
    })
  }

  return (
    <>
      <Header>
        <Title>Whitelist address</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      <Content>
        <Wrapper>
          <Text>
            Grant an address permission to view ownership, view private
            metadata, and/or to transfer this asset.
          </Text>
          <AddNew
            address={address}
            setAddress={setAddress}
            options={options}
            setOptions={setOptions}
            expiration={expiration}
            setExpiration={setExpiration}
            onAdd={onWhitelistAdd}
            loading={isLoading}
            errors={addErrors}
          />
        </Wrapper>
        <Separator margin>Approved List</Separator>
        <ApprovalList list={approvedList} tokenId={tokenId} />
      </Content>
    </>
  )
}

export default memo(WhitelistingModal)
