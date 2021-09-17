import { Theme } from 'r34-branding'

import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
