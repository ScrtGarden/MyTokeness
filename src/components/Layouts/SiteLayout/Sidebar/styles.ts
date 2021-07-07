import styled, { keyframes } from 'styled-components'

import { Modal } from '../../../UI/Modal'

const flow = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: -900px 0; 
  }
  100% {
    background-position: 0 0;
  }
`

const Container = styled.div`
  align-self: flex-start;
  background-color: ${(props) => props.theme.fg};
  border-right: 2px solid ${(props) => props.theme.border.color};
  height: calc(100vh - 62px);
  overflow-y: auto;
  padding: ${(props) => props.theme.space.sm} 0;
  position: sticky;
  top: 62px;
`

const SectionHeader = styled.div`
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.sm};
  font-weight: ${(props) => props.theme.font.weights.bold};
  margin-top: ${(props) => props.theme.space.xs};
  padding: ${(props) => `${props.theme.space.xs} ${props.theme.space.md}`};
`

const Donation = styled.div`
  align-items: center;
  bottom: ${(props) => props.theme.space.lg};
  color: ${(props) => props.theme.font.colors.primary};
  column-gap: ${(props) => props.theme.space.sm};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  left: 0;
  margin: 0 auto;
  padding: 8px 20px;
  position: absolute;
  right: 0;
  width: fit-content;
  transition: transform 0.3s ease;

  :hover {
    transform: scale(1.02);
  }

  ::before {
    border-radius: 500px;
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
    filter: blur(5px);
    width: calc(100%);
    height: calc(100%);
    opacity: 1;
    background: linear-gradient(
        45deg,
        rgb(255, 0, 0),
        rgb(255, 115, 0),
        rgb(255, 251, 0),
        rgb(72, 255, 0),
        rgb(0, 255, 213),
        rgb(0, 43, 255),
        rgb(122, 0, 255),
        rgb(255, 0, 200),
        rgb(255, 0, 0)
      )
      0% 0% / 400%;
    animation: 10s linear 0s infinite normal none running ${flow};
    transition: opacity 0.3s ease-in-out 0s;
  }

  ::after {
    box-shadow: 0px 0px 10px 1px #fff;
    border-radius: 500px;
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.bg};
    left: 0px;
    top: 0px;
    transition: background-color 0.3s ease;
  }
`

const StyledModal = styled(Modal)`
  /* max-width: 600px; */
  /* overflow-y: unset; */
`

export { Container, SectionHeader, Donation, StyledModal }
