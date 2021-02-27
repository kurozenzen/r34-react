const theme = {
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
    accentColor: '#ee3344',
    hoverAccent: '#ee3344',
    backgroundColor: '#121212',
    backgroundColor2: '#fff',
    subduedText: '#ffffff80',
    layerBg: '#ffffff11',
    layerBgSolid: '#222222',
    layerBgHighlight: '#ffffff22',
  },
  shadow: {
    box: 'box-shadow: 0 0 8px #000;',
    drop: 'drop-shadow(0 0 4px #000)',
  },
  timings: {
    transitionTime: '0.2s',
    longTransitionTime: '0.2s',
  },
  misc: {
    layer: '#ffffff11; :hover { background: #ffffff16;} transition: background-color 0.2s ease-in-out',
  },
  fontSizes: {
    content: '15px',
    bigTitle: '24px',
  },
}

export default theme

export type ThemeType = typeof theme
