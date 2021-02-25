import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    dimensions: {
      borderRadius: string
      borderWidth: string
      spacing: string
      bigSpacing: string
      hugeSpacing: string
      gutter: string
      blockHeight: string
      bodyWidth: string
    }
    colors: {
      accentColor: string
      hoverAccent: string
      backgroundColor: string
      backgroundColor2: string
      subduedText: string
      layerBg: string
      layerBgSolid: string
    }
    shadow: {
      box: string
      drop: string
    }
    timings: {
      transitionTime: string
      longTransitionTime: string
    }
    misc: {
      layer: string
    }
    fontSizes: {
      content: string
      bigTitle: string
    }
  }
}
