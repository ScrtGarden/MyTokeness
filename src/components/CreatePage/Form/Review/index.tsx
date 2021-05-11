import commaNumber from 'comma-number'
import { memo } from 'react'

import { Label } from '../../../UI/Forms'
import { Text } from '../../../UI/Typography'
import Store from '../../Store'
import { Header } from '../styles'
import { Content, Field } from './styles'

const Review = () => {
  // context store state
  const totalBalance = Store.useStoreState((state) => state.totalBalanceAmount)
  const symbol = Store.useStoreState((state) => state.symbol)

  return (
    <>
      <Header margin>Review</Header>
      <Content>
        <Field>
          <Label>Total initial supply</Label>
          <Text>{`${commaNumber(
            parseFloat(totalBalance)
          )} ${symbol.toUpperCase()}`}</Text>
        </Field>
      </Content>
    </>
  )
}

export default memo(Review)
