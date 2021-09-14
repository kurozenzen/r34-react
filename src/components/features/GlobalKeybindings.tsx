import React from 'react'
import { RouteName } from '../../data/types'

const keybinds: Record<string, () => void> = {
  '/': () => document.getElementById('tag-input')?.focus(),
  'ctrl+1': () => (window.location.hash = `#${RouteName.SEARCH}`),
  'ctrl+2': () => (window.location.hash = `#${RouteName.PREFERENCES}`),
  'ctrl+3': () => (window.location.hash = `#${RouteName.ABOUT}`),
}

export default function GlobalKeybindings() {
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const pressed = `${event.ctrlKey ? 'ctrl+' : ''}${event.key}`

      if (pressed in keybinds) {
        event.preventDefault()
        event.stopPropagation()
        keybinds[pressed]()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  })

  return null
}
