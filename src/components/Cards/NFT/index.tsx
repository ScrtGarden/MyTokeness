import { FC, memo } from 'react'

import useQueryNFTDossier from '../../../hooks/useQueryNFTDossier'
import useToggle from '../../../hooks/useToggle'
import Transfer from '../../Modals/Transfer'
import UnsealModal from '../../Modals/Unseal'
import Whitelisting from '../../Modals/Whitelisting'
import SkeletonNFTCard from '../../Skeleton/NFTCard'
import { IconButton, StyledIcon } from '../../UI/Buttons'
import Dropdown from '../../UI/Dropdowns/Menu'
import { Modal } from '../../UI/Modal'
import ContentsPrivacySetting from './ContentsPrivacySetting'
import Details from './Details'
import Menu from './Menu'
import OwnershipPrivacySetting from './OwnershipPrivacySetting'
import Settings from './Settings'
import { Container, StyledModal, Wrapper } from './styles'
import Visual from './Visual'

type Props = {
  id: string
  contractAddress: string
  walletAddress: string
  viewingKey: string
  enabledSealedData?: boolean
  onClick: () => void
}

const NFTCard: FC<Props> = ({
  id,
  contractAddress,
  walletAddress,
  viewingKey,
  enabledSealedData,
  onClick,
}) => {
  // component state
  const [showMenu, toggleMenu] = useToggle()
  const [showUnseal, toggleUnseal] = useToggle()
  const [showOwnership, toggleOwnership] = useToggle()
  const [showContentsSettings, toggleContentsSettings] = useToggle()
  const [showWhitelist, toggleWhitelist] = useToggle()
  const [showTransfer, toggleTransfer] = useToggle()

  // custom hooks
  const { data, isLoading, isError } = useQueryNFTDossier(contractAddress, id, {
    walletAddress,
    viewingKey,
  })

  if (isLoading) {
    return <SkeletonNFTCard />
  }

  if (isError || !data) {
    return <Container>Error</Container>
  }

  console.log({ data })
  return (
    <>
      <Container>
        <Visual
          publicImage={data.publicMetadata.image}
          privateImage={data.privateMetadata?.image}
          onClick={onClick}
        />
        <Wrapper>
          <Details
            title={data.publicMetadata.name}
            properties={data.publicMetadata.properties}
          />
          <Dropdown
            isOpen={showMenu}
            toggle={toggleMenu}
            content={
              <Menu
                onClickUnseal={toggleUnseal}
                showUnseal={!!enabledSealedData && data.isSealed}
                onClickOwnership={toggleOwnership}
                onClickPrivateContents={toggleContentsSettings}
                onClickWhitelist={toggleWhitelist}
                onClickTransfer={toggleTransfer}
              />
            }
            placement="left-end"
          >
            <IconButton onClick={toggleMenu}>
              <StyledIcon name="ellipsis-v" width={25} height={25} />
            </IconButton>
          </Dropdown>
        </Wrapper>
        <Settings
          enabledSealedData={enabledSealedData}
          isSealed={data.isSealed}
          hiddenOwnership={!data.ownerIsPublic}
          ownershipExpiration={data.publicOwnershipExpiration}
          hiddenPrivateMetadata={!data.privateMetadataIsPublic}
          privateMetadataExpiration={data.privateMetadataIsPublicExpiration}
          numOfWhitelistedAddresses={data.tokenApprovals.length}
        />
      </Container>
      <Modal isOpen={showUnseal} onBackgroundClick={toggleUnseal}>
        <UnsealModal
          toggle={toggleUnseal}
          name={data.publicMetadata.name}
          tokenId={id}
          contractAddress={contractAddress}
          walletAddress={walletAddress}
          viewingKey={viewingKey}
        />
      </Modal>
      <Modal isOpen={showOwnership}>
        <OwnershipPrivacySetting
          tokenId={id}
          contractAddress={contractAddress}
          toggle={toggleOwnership}
          isPrivate={!data.ownerIsPublic}
          expiration={data.publicOwnershipExpiration}
          walletAddress={walletAddress}
          viewingKey={viewingKey}
        />
      </Modal>
      <Modal isOpen={showContentsSettings}>
        <ContentsPrivacySetting
          tokenId={id}
          contractAddress={contractAddress}
          toggle={toggleContentsSettings}
          isPrivate={!data.privateMetadataIsPublic}
          expiration={data.privateMetadataIsPublicExpiration}
          walletAddress={walletAddress}
          viewingKey={viewingKey}
        />
      </Modal>
      <StyledModal isOpen={showWhitelist}>
        <Whitelisting
          toggle={toggleWhitelist}
          tokenId={id}
          contractAddress={contractAddress}
          walletAddress={walletAddress}
          approvedList={data.tokenApprovals}
          viewingKey={viewingKey}
        />
      </StyledModal>
      <Modal isOpen={showTransfer}>
        <Transfer
          toggle={toggleTransfer}
          contractAddress={contractAddress}
          walletAddress={walletAddress}
          tokenId={id}
          name={data.publicMetadata.name}
          viewingKey={viewingKey}
        />
      </Modal>
    </>
  )
}

export default memo(NFTCard)
