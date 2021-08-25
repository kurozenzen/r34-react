import { DefaultTheme } from 'styled-components'

const dark: DefaultTheme = {
  dimensions: {
    borderRadius: '3px',
    borderWidth: '2px',
    spacing: '4px',
    bigSpacing: '8px',
    hugeSpacing: '16px',
    blockHeight: '36px',
    bodyWidth: '1000px',
    modalWidth: '500px',
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
    backdrop: '#000000d0',

    // theme
    accentColor: '#ee3344',
    accentColorHover: '#f74555',
    accentColorActive: '#d93847',

    // semantic
    toggleOff: '#ffffff',
    focus: '#ffffff',
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
    content: '16px',
    bigTitle: '24px',
  },
}

export default dark
