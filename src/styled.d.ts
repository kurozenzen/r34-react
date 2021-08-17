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
      accentColorHover: string
      accentColorActive: string
      backgroundColor: string
      backgroundColor2: string
      subduedText: string
      layerBg: string
      layerBgSolid: string
      layerBgHighlight: string
      liked: string
      positive: string
      negative: string
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
