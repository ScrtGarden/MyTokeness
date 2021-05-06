import { StoreProvider } from 'easy-peasy'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../src/styles/GlobalStyle'
import theme from '../src/styles/theme'
import { useStore } from '../store'
import { Page } from '../types/page'

type Props = AppProps & {
  Component: Page
}

const MyApp = ({ Component, pageProps }: Props) => {
  const store = useStore(pageProps.initialState)

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme.dark}>
        <GlobalStyle />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MyApp
