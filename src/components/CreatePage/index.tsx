import { Container, InnerContainer } from '../UI/Containers'
import { PageTitle } from '../UI/Typography'
import Configuration from './Form/Configuration'
import Details from './Form/Details'
import InitialBalances from './Form/InitialBalances'
import Review from './Form/Review'
import { Form } from './Form/styles'
import { Content } from './styles'

const CreatePage = () => {
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
          </Form>
        </Content>
      </InnerContainer>
    </Container>
  )
}

export default CreatePage
