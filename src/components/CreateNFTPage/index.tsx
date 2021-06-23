import BackLink from '../Common/BackLink'
import { Container, InnerContainer } from '../UI/Containers'
import { PageTitle } from '../UI/Typography'
import Form from './Form'
import ContextStore from './Store'

const CreateNFTPage = (): JSX.Element => (
  <Container>
    <InnerContainer>
      <BackLink label="Back" />
      <PageTitle>Create your asset</PageTitle>
      <ContextStore.Provider>
        <Form />
      </ContextStore.Provider>
    </InnerContainer>
  </Container>
)

export default CreateNFTPage
