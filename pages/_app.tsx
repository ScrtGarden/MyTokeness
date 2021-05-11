import { StoreProvider } from 'easy-peasy'
import { AppProps } from 'next/app'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'

import LoadingOverlay from '../src/components/LoadingOverlay'
import GlobalStyle from '../src/styles/GlobalStyle'
import theme from '../src/styles/theme'
import { useStore } from '../store'
import { Page } from '../types/page'

type Props = AppProps & {
  Component: Page
}

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: Props) => {
  const store = useStore(pageProps.initialState)

  const [ready, setReady] = useState(false)

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme.dark}>
          <GlobalStyle />
          {ready ? (
            getLayout(<Component {...pageProps} />)
          ) : (
            <LoadingOverlay onLoaded={(value) => setReady(value)} />
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </StoreProvider>
  )
}

export default MyApp
