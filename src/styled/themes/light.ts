import dark from './dark'

const light = {
  ...dark,
  colors: {
    ...dark.colors,
    text: '#000',
    backgroundColor: '#fff',
    backgroundColor2: '#fff',
    subduedText: '#00000080',
    layerBg: '#00000011',
    layerBgSolid: '#dddddd',
    layerBgHighlight: '#00000022',
  },
}

export default light
