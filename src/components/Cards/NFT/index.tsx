import { FC, memo } from 'react'

import useQueryNFTDossier from '../../../hooks/useQueryNFTDossier'
import useToggle from '../../../hooks/useToggle'
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
}

const NFTCard: FC<Props> = ({
  id,
  contractAddress,
  walletAddress,
  viewingKey,
  enabledSealedData,
}) => {
  // component state
  const [showMenu, toggleMenu] = useToggle()
  const [showUnseal, toggleUnseal] = useToggle()
  const [showOwnership, toggleOwnership] = useToggle()
  const [showContentsSettings, toggleContentsSettings] = useToggle()
  const [showWhitelist, toggleWhitelist] = useToggle()

  // custom hooks
  const { data, isLoading, isError } = useQueryNFTDossier(
    contractAddress,
    id,
    walletAddress,
    viewingKey
  )

  const onClickUnseal = () => {
    toggleMenu()
    toggleUnseal()
  }

  const onClickOwnership = () => {
    toggleMenu()
    toggleOwnership()
  }

  const onClickPrivateContents = () => {
    toggleMenu()
    toggleContentsSettings()
  }

  const onClickWhitelist = () => {
    toggleMenu()
    toggleWhitelist()
  }

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
        <Visual image={data.publicMetadata.image} />
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
                onClickUnseal={onClickUnseal}
                showUnseal={!!enabledSealedData && data.isSealed}
                onClickOwnership={onClickOwnership}
                onClickPrivateContents={onClickPrivateContents}
                onClickWhitelist={onClickWhitelist}
              />
            }
            placement="left-end"
          >
            <IconButton>
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
        />
      </Modal>
      <Modal isOpen={showOwnership}>
        <OwnershipPrivacySetting
          tokenId={id}
          contractAddress={contractAddress}
          toggle={toggleOwnership}
          isPrivate={!data.ownerIsPublic}
          expiration={data.publicOwnershipExpiration}
        />
      </Modal>
      <Modal isOpen={showContentsSettings}>
        <ContentsPrivacySetting
          tokenId={id}
          contractAddress={contractAddress}
          toggle={toggleContentsSettings}
          isPrivate={!data.privateMetadataIsPublic}
          expiration={data.privateMetadataIsPublicExpiration}
        />
      </Modal>
      <StyledModal isOpen={showWhitelist}>
        <Whitelisting
          toggle={toggleWhitelist}
          tokenId={id}
          contractAddress={contractAddress}
          walletAddress={walletAddress}
          approvedList={data.tokenApprovals}
        />
      </StyledModal>
    </>
  )
}

export default memo(NFTCard)
