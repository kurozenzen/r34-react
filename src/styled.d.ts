import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      accentColor: string
      accentColorActive: string
      accentColorHover: string
      backdrop: string
      backgroundColor: string
      backgroundColor2: string
      focus: string
      layerBg: string
      layerBgHighlight: string
      layerBgSolid: string
      liked: string
      negative: string
      positive: string
      subduedText: string
      text: string
      toggleOff: string
    }
    dimensions: {
      bigSpacing: string
      blockHeight: string
      bodyWidth: string
      borderRadius: string
      borderWidth: string
      hugeSpacing: string
      modalWidth: string
      spacing: string
    }
    fontSizes: {
      bigTitle: string
      content: string
    }
    shadow: {
      color: string
      radius: string
    }
    timings: {
      longTransitionTime: string
      transitionTime: string
    }
  }
}
