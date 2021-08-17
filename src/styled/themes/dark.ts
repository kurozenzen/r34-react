import { DefaultTheme } from 'styled-components'

const dark: DefaultTheme = {
  dimensions: {
    borderRadius: '3px',
    borderWidth: '2px',
    spacing: '4px',
    bigSpacing: '8px',
    hugeSpacing: '16px',
    gutter: '8px',
    blockHeight: '32px',
    bodyWidth: '1000px',
  },
  colors: {
    //basic
    text: '#ffffff',
    backgroundColor: '#121212',
    backgroundColor2: '#ffffff',
    subduedText: '#ffffff80',
    layerBg: '#ffffff11',
    layerBgSolid: '#222222',
    layerBgHighlight: '#ffffff22',

    // theme
    accentColor: '#ee3344',
    accentColorHover: '#f74555',
    accentColorActive: '#d93847',

    // semantic
    liked: '#ff0d50',
    positive: '#3fb950',
    negative: '#f85149',
  },
  shadow: {
    radius: '6px',
    color: '#00000080',
  },
  timings: {
    transitionTime: '0.2s',
    longTransitionTime: '0.2s',
  },
  fontSizes: {
    content: '15px',
    bigTitle: '24px',
  },
}

export default dark
