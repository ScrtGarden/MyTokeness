// import original module declarations
import 'styled-components'

import theme from '../src/styles/theme'

type CustomTheme = typeof theme.dark

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
