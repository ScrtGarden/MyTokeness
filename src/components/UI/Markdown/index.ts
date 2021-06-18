import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

const Markdown = styled(ReactMarkdown)`
  & > h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${(props) => props.theme.font.colors.primary};
  }

  p {
    color: ${(props) => props.theme.font.colors.secondary};
    font-size: ${(props) => props.theme.font.sizes.md};
    line-height: ${(props) => props.theme.font.lineHeights.md};

    :only-child {
      margin: 0;
    }
  }

  ul {
    color: ${(props) => props.theme.font.colors.secondary};
    font-size: ${(props) => props.theme.font.sizes.md};
  }
`

export { Markdown }
