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
export const supportsNetworkInformationAPI =
  'connection' in navigator || 'mozConnection' in navigator || 'webkitConnection' in navigator
export const supportsLocalStorage = Boolean(localStorage)

export async function openFullscreen(element: Element) {
  if (document.fullscreenEnabled && document.fullscreenElement === null) {
    try {
      const result = element.requestFullscreen()

      if ('then' in result) {
        return await result
      }

      return Promise.resolve(result)
    } catch (err) {
      // this causes a warning in console. So nothing to do for me here.
    }
  }

  return null
}

export async function closeFullscreen() {
  if (document.fullscreenEnabled && document.fullscreenElement !== null) {
    try {
      const result = document.exitFullscreen()

      if ('then' in result) {
        return await result
      }

      return Promise.resolve(result)
    } catch (err) {
      // this causes a warning in console. So nothing to do for me here.
    }
  }

  return null
}
