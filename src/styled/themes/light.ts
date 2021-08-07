import dark from './dark'

const light = {
  ...dark,
  colors: {
    ...dark.colors,
    text: '#000',
    backgroundColor: '#eee',
    backgroundColor2: '#eee',
    subduedText: '#00000080',
    layerBg: '#ffffff',
    layerBgSolid: '#ffffff',
    layerBgHighlight: '#00000022',
  },
  shadow: {
    ...dark.shadow,
    color: 'transparent',
  },
}

export default light
