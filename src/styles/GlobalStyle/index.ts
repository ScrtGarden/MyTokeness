import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  html {
    background-color: ${(props) => props.theme.bg};
    font-size: 62.5%;
    min-height: 100vh;
  }

  body {
    font-family: 'Open Sans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: inherit;
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: inherit;
  }
`

export default GlobalStyle
