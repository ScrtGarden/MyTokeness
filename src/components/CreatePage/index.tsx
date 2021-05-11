import { MouseEvent } from 'react'

import { Button } from '../UI/Buttons'
import { Container, InnerContainer } from '../UI/Containers'
import { PageTitle } from '../UI/Typography'
import Configuration from './Form/Configuration'
import Details from './Form/Details'
import InitialBalances from './Form/InitialBalances'
import Review from './Form/Review'
import { Form } from './Form/styles'
import Store from './Store'
import { Content } from './styles'

const CreatePage = () => {
  // context store state
  const hasErrors = Store.useStoreState((state) => state.validation.hasErrors)

  // context store actions
  const setState = Store.useStoreActions((actions) => actions.setState)

  const onClickCreate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setState({ key: 'hasTriedSubmitting', data: true })

    if (hasErrors) {
      return
    }
  }

  return (
    <Container>
      <InnerContainer>
        <PageTitle>Create your token</PageTitle>
        <Content>
          <Form>
            <Details />
            <Configuration />
          </Form>
          <Form>
            <InitialBalances />
            <Review />
            <Button isStretched onClick={onClickCreate}>
              Create
            </Button>
          </Form>
        </Content>
      </InnerContainer>
    </Container>
  )
}

const CreatePageWithStore = () => (
  <Store.Provider>
    <CreatePage />
  </Store.Provider>
)

export default CreatePageWithStore
