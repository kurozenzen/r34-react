import { useCallback, useState } from "react"

export default function useToggle(initialValue = false): [boolean, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue)
  const toggleValue = useCallback(() => setValue(!value), [value])
  const resetValue = useCallback(() => setValue(initialValue), [initialValue])

  return [value, toggleValue, resetValue]
}
