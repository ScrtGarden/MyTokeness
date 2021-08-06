import styled from 'styled-components'

interface PageTitleProps {
  readonly center?: boolean
}

interface TextProps {
  readonly primary?: boolean
  readonly caps?: boolean
}

const PageTitle = styled.h1<PageTitleProps>`
  color: ${(props) => props.theme.font.colors.primary};
  font-size: 4rem;
  font-weight: ${(props) => props.theme.font.weights.semibold};
  margin-bottom: ${(props) => props.theme.space.lg};
  margin-top: 0;
  ${(props) => props.center && 'text-align: center'};
`

const Text = styled.p<TextProps>`
  color: ${(props) =>
    props.theme.font.colors[props.primary ? 'primary' : 'secondary']};
  font-size: ${(props) => props.theme.font.sizes.md};
  line-height: ${(props) => props.theme.font.lineHeights.md};
  margin: 0;
  ${(props) => props.caps && 'text-transform: uppercase'};

  span {
    color: ${(props) => props.theme.font.colors.primary};
    font-weight: ${(props) => props.theme.font.weights.semibold};
  }
`

export { PageTitle, Text }
