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
    text: '#fff',
    backgroundColor: '#121212',
    backgroundColor2: '#fff',
    subduedText: '#ffffff80',
    layerBg: '#ffffff11',
    layerBgSolid: '#222222',
    layerBgHighlight: '#ffffff22',

    // theme
    accentColor: '#ee3344',
    hoverAccent: '#ff4455',

    // semantic
    liked: '#ff0d50',
    positive: '#40ee40',
    negative: '#dd1010',
  },
  shadow: {
    radius: '4px',
    color: 'transparent',
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
