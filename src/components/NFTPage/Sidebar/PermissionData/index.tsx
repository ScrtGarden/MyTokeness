import { FC, memo } from 'react'

import { UINFTDossier } from '../../../../../interface/nft-ui'
import truncateAddress from '../../../../../utils/truncateAddress'
import { useStoreState } from '../../../../hooks/storeHooks'
import { Field, Label } from '../../../UI/Forms'
import { Text } from '../../../UI/Typography'
import { Container, Owner, StyledIcon, StyledTextarea, Wrapper } from './styles'

type Props = {
  owner: UINFTDossier['owner']
  content?: string
}

const PermissionData: FC<Props> = ({ owner, content }) => {
  // store state
  const walletAddress = useStoreState((state) => state.auth.connectedAddress)

  return (
    <Container>
      {owner && (
        <Owner>
          <Label>Owner</Label>
          <Wrapper>
            <StyledIcon name="user-circle-duo" width={40} height={40} />
            <Text>
              {owner === walletAddress ? 'You' : truncateAddress(owner)}
            </Text>
          </Wrapper>
        </Owner>
      )}
      {content && (
        <Field>
          <Label>Private Content</Label>
          <StyledTextarea defaultValue={content} rows={4} disabled />
        </Field>
      )}
    </Container>
  )
}

export default memo(PermissionData)
