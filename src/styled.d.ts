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
      text: string
      accentColor: string
      hoverAccent: string
      backgroundColor: string
      backgroundColor2: string
      subduedText: string
      layerBg: string
      layerBgSolid: string
      layerBgHighlight: string
      liked: string
    }
    shadow: {
      radius: string
      color: string
    }
    timings: {
      transitionTime: string
      longTransitionTime: string
    }
    fontSizes: {
      content: string
      bigTitle: string
    }
  }
}
