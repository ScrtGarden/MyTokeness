import { FC, memo, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { Contract } from 'secretjs'

import { Collection } from '../../../../store/collections/collections.model'
import { CONTRACT_CODE_ID } from '../../../../utils/constants'
import { queryChain } from '../../../../utils/secretjs'
import { useStoreActions } from '../../../hooks/storeHooks'
import ButtonWithLoading from '../../Common/ButtonWithLoading'
import MessageWithIcon from '../../Common/MessageWithIcon'
import Icon from '../../Icons'
import { Button } from '../../UI/Buttons'
import { Field, Input, Label } from '../../UI/Forms'
import { Buttons, CloseButton, Content, Header, Title } from '../../UI/Modal'
import { validate } from './lib'

type Props = {
  toggle: () => void
  addedCollections: Collection[]
  myCollections: Contract[]
}

const AddCollection: FC<Props> = (props) => {
  const { toggle, addedCollections, myCollections } = props

  // store actions
  const addCollection = useStoreActions(
    (actions) => actions.collections.addCollection
  )

  // component state
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  const { isLoading, refetch } = useQuery(
    ['getContract', address],
    () => queryChain.getContract(address),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )

  useEffect(() => {
    error && setError('')
  }, [address])

  const onClickAdd = async () => {
    const { hasError, errors } = validate(
      address,
      addedCollections,
      myCollections
    )

    setError(errors.address)

    if (hasError) {
      return
    }

    try {
      const { data } = await refetch()
      if (data?.codeId !== CONTRACT_CODE_ID.NFT) {
        setError('Sorry, this is an incompatible contract.')
        return
      }
    } catch (error) {
      setError('Unable to fetch contract details.')
      return
    }

    toast.success('Added contract to collections.')
    addCollection(address)
    toggle()
  }

  return (
    <>
      <Header>
        <Title>Add existing collection</Title>
        <CloseButton onClick={toggle}>
          <Icon name="times" />
        </CloseButton>
      </Header>
      <Content>
        <Field>
          <Label>Contract address</Label>
          <Input
            placeholder="secret1gqmn3e3p9gudwa4x3pucr25px4zw5ypqh62jgu"
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
          />
          {error && <MessageWithIcon validation="error" message={error} />}
        </Field>
      </Content>
      <Buttons>
        <Button onClick={toggle}>Cancel</Button>
        <ButtonWithLoading
          text="Add"
          isPrimary
          onClick={onClickAdd}
          width={51}
          loading={isLoading}
        />
      </Buttons>
    </>
  )
}

export default memo(AddCollection)
