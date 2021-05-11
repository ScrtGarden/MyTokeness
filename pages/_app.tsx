import { StoreProvider } from 'easy-peasy'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
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
  const queryClient = new QueryClient()

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme.dark}>
          <GlobalStyle />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </QueryClientProvider>
    </StoreProvider>
  )
}

export default MyApp
