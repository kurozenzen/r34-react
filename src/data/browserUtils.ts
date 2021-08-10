export const supportsFlexGap = (() => {
  // create flex container with row-gap set
  var flex = document.createElement('div')
  flex.style.display = 'flex'
  flex.style.flexDirection = 'column'
  flex.style.rowGap = '1px'

  // create two, elements inside it
  flex.appendChild(document.createElement('div'))
  flex.appendChild(document.createElement('div'))

  // append to the DOM (needed to obtain scrollHeight)
  document.body.appendChild(flex)
  var isSupported = flex.scrollHeight === 1 // flex container should be 1px high from the row-gap
  //@ts-expect-error
  flex.parentNode.removeChild(flex)

  return isSupported
})()

export const supportsGap = 'gap' in document.body.style
export const supportsAspectRatio = 'aspect-ratio' in document.body.style
export const supportsObjectFit = 'object-fit' in document.body.style
export const supportsFullscreen = document.fullscreenEnabled

export function openFullscreen(element: Element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
    //@ts-expect-error
  } else if (element.webkitRequestFullscreen) {
    //@ts-expect-error
    element.webkitRequestFullscreen()
    //@ts-expect-error
  } else if (element.msRequestFullscreen) {
    //@ts-expect-error
    element.msRequestFullscreen()
  }
}

export function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
    //@ts-expect-error
  } else if (document.webkitExitFullscreen) {
    //@ts-expect-error
    document.webkitExitFullscreen()
    //@ts-expect-error
  } else if (document.msExitFullscreen) {
    //@ts-expect-error
    document.msExitFullscreen()
  }
}

export const supportsNetworkInformationAPI =
  'connection' in navigator || 'mozConnection' in navigator || 'webkitConnection' in navigator
