import { memo } from 'react'

import Store from '../../Store'
import { Header, Wrapper } from '../styles'
import Item from './Item'

const InitialBalances = () => {
  // context store state
  const initialBalances = Store.useStoreState((state) => state.initialBalances)

  // context store actions
  const setBalance = Store.useStoreActions((actions) => actions.setBalance)

  return (
    <>
      <Header>Initial Balances</Header>
      {initialBalances.map((item, index) => (
        <Item key={index} {...item} index={index} onChange={setBalance} />
      ))}
    </>
  )
}

export default memo(InitialBalances)
