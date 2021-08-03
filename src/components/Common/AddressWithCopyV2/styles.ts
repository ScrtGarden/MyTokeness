import styled from 'styled-components'

interface TextProps {
  readonly bold?: boolean
  readonly md?: boolean
}

const Container = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.sm};
  display: flex;
  flex-direction: row;
`

const Address = styled.p`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  cursor: pointer;
  margin: 0;
  /* text-decoration: underline; */
`

const Text = styled.p<TextProps>`
  color: ${(props) => props.theme.font.colors.inversePrimary};
  font-size: ${(props) => props.theme.font.sizes[props.md ? 'md' : 'sm']};
  font-weight: ${(props) =>
    props.theme.font.weights[props.bold ? 'semibold' : 'regular']};
  margin: 0;

  :last-child {
    margin-top: 3px;
  }

  :only-child {
    margin-top: 0;
  }
`

export { Container, Address, Text }
