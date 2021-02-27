import { useCallback, useState } from 'react'
import { Modifier } from '../data/types'

const order = [Modifier.PLUS, Modifier.MINUS, Modifier.OR]

/**
 * Small utility hook to abstract the rotating modifier away
 */
export default function useModifier(initialValue: Modifier = Modifier.PLUS): [Modifier, () => void] {
  const [modifier, setModifier] = useState(initialValue)

  const nextModifier = useCallback(() => {
    const currentIndex = order.indexOf(modifier)
    const nextIndex = currentIndex + 1

    // make the value rotate
    setModifier(order[nextIndex % order.length])
  }, [modifier])

  return [modifier, nextModifier]
}
