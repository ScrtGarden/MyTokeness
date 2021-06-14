import { FC, memo } from 'react'

import useQueryNFTDossier from '../../../hooks/useQueryNFTDossier'
import useToggle from '../../../hooks/useToggle'
import UnsealModal from '../../Modals/Unseal'
import SkeletonNFTCard from '../../Skeleton/NFTCard'
import { IconButton, StyledIcon } from '../../UI/Buttons'
import Dropdown from '../../UI/Dropdowns/Menu'
import { Modal } from '../../UI/Modal'
import Details from './Details'
import Menu from './Menu'
import Settings from './Settings'
import { Container, Wrapper } from './styles'
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

  if (isLoading) {
    return <SkeletonNFTCard />
  }

  if (isError || !data) {
    return <Container>Error</Container>
  }

  console.log({ data, enabledSealedData })
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
            content={<Menu onClickUnseal={onClickUnseal} />}
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
    </>
  )
}

export default memo(NFTCard)
