import dark from './dark'

const light = {
  ...dark,
  colors: {
    ...dark.colors,
    text: '#000',
    backgroundColor: '#ffffff',
    backgroundColor2: '#ffffff',
    subduedText: '#00000060',
    layerBg: '#ffffff',
    layerBgSolid: '#ffffff',
    layerBgHighlight: '#00000022',
    focus: '#000000',
    toggleOff: '#00000060',
  },
  shadow: {
    ...dark.shadow,
    color: 'transparent',
  },
}

export default light
