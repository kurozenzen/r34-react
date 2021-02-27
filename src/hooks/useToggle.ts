import { useCallback, useState } from 'react'

/**
 * A small wrapper for a useState<boolean> that is primarily used for toggling.
 * Saves me a few useCallbacks.
 */
export default function useToggle(initialValue = false): [boolean, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue)
  const toggleValue = useCallback(() => setValue(!value), [value])
  const resetValue = useCallback(() => setValue(initialValue), [initialValue])

  return [value, toggleValue, resetValue]
}
