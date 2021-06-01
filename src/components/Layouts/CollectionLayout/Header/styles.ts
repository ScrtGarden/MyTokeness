import styled from 'styled-components'

import { PageTitle } from '../../../UI/Typography'

const Container = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between; */
  margin: ${(props) => props.theme.space.xxl} 0;
  width: 100%;
`

const Title = styled(PageTitle)`
  margin-bottom: 0;
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const AddressWrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => props.theme.space.sm};
`

const Subtext = styled.p`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.md};
  margin: 0;
`

export { Container, Title, Wrapper, Subtext, AddressWrapper }
