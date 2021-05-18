import styled from 'styled-components'

import Icon from '../../../../Icons'

const OUTLINE_COLOR = '#f0be726e'

interface InfoPillProps {
  readonly right?: boolean
  readonly left?: boolean
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Circle = styled.div`
  align-items: center;
  background: ${(props) => props.theme.fg};
  border: 2px solid #f0be72;
  border-radius: 50%;
  display: flex;
  height: 3.8rem;
  justify-content: center;
  width: 3.8rem;
`

const StyledIcon = styled(Icon)`
  fill: #f0be72;
  height: 50%;
  width: 50%;
`

const InfoPill = styled.div<InfoPillProps>`
  align-items: center;
  border: 2px solid ${OUTLINE_COLOR};
  border-radius: 500px;
  display: flex;
  color: #fff;
  font-size: ${(props) => props.theme.font.sizes.md};
  height: 34px;
  padding: 0 ${(props) => props.theme.space.sm};

  ${(props) =>
    props.left &&
    `
      border-right: none;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
  `}

  ${(props) =>
    props.right &&
    `
      border-left: none;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      font-weight: ${props.theme.font.weights.semibold};
  `}
`

const Wrapper = styled.div`
  position: relative;
`

const Outline = styled.div`
  border-bottom: 2px solid ${OUTLINE_COLOR};
  border-top: 2px solid ${OUTLINE_COLOR};
  bottom: 0;
  height: 34px;
  position: absolute;
  margin: auto;
  top: 0;
  width: 100%;
  z-index: -1;
`

export { Container, Circle, StyledIcon, InfoPill, Wrapper, Outline }
