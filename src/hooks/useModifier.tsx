import { useCallback, useState } from 'react'
import { TagModifier } from 'r34-types'

const order: TagModifier[] = ['+', '-', '~']

/**
 * Small utility hook to abstract the rotating modifier away
 */
export default function useModifier(initialValue: TagModifier = '+') {
  const [index, setIndex] = useState(order.indexOf(initialValue))
  const nextModifier = useCallback(() => setIndex((index + 1) % order.length), [index])

  return [order[index], nextModifier] as const
}
