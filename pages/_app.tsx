import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'

import { StoreProvider } from 'easy-peasy'
import { AppProps } from 'next/app'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import { ModalProvider } from 'styled-react-modal'

import LoadingOverlay from '../src/components/LoadingOverlay'
import { ModalBackground } from '../src/components/UI/Modal'
import { StyledToastContainer } from '../src/components/UI/Notification'
import GlobalStyle from '../src/styles/GlobalStyle'
import theme from '../src/styles/theme'
import { useStore } from '../store'
import { Page } from '../types/page'

type Props = AppProps & {
  Component: Page
}

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: Props): JSX.Element => {
  const store = useStore(pageProps.initialState)

  const [ready, setReady] = useState(false)

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme.dark}>
          <ModalProvider backgroundComponent={ModalBackground}>
            <GlobalStyle />
            {ready ? (
              getLayout(<Component {...pageProps} />)
            ) : (
              <LoadingOverlay onLoaded={(value) => setReady(value)} />
            )}
            <StyledToastContainer autoClose={8000} />
          </ModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StoreProvider>
  )
}

export default MyApp
