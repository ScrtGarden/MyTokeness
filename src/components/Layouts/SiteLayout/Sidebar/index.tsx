import { FC } from 'react'

import { SIDEBAR_TABS } from '../../../../../utils/constants'
import useToggle from '../../../../hooks/useToggle'
import Icon from '../../../Icons'
import Donate from '../../../Modals/Donate'
import { Container, Donation, SectionHeader, StyledModal } from './styles'
import Tab from './Tab'

const Sidebar: FC = () => {
  const [showDonation, toggleDonation] = useToggle()

  return (
    <>
      <Container>
        <Tab item={SIDEBAR_TABS.HOME} />
        <SectionHeader>TOKEN</SectionHeader>
        {Object.entries(SIDEBAR_TABS.TOKEN).map(([key, value]) => (
          <Tab key={key} item={value} section="token" id={key} />
        ))}
        <SectionHeader>NFT</SectionHeader>
        {Object.entries(SIDEBAR_TABS.NFT).map(([key, value]) => (
          <Tab key={key} item={value} section="nft" id={key} />
        ))}
        <Donation onClick={toggleDonation}>
          <Icon name="hands-heart-duo" height={20} width={20} fill="#C490E4" />
          Give some love
        </Donation>
      </Container>
      <StyledModal isOpen={showDonation} onBackgroundClick={toggleDonation}>
        <Donate toggle={toggleDonation} />
      </StyledModal>
    </>
  )
}

export default Sidebar
