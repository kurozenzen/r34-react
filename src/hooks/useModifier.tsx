import { useCallback } from 'react'
import { TagModifier } from 'r34-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectSuggestionsModifier } from '../redux/selectors'
import { setSuggestionsModifier } from '../redux/actions'

const order: TagModifier[] = ['+', '-', '~']

/**
 * Small utility hook to abstract the rotating modifier away
 */
export default function useModifier() {
  const dispatch = useDispatch()
  const modifier = useSelector(selectSuggestionsModifier)
  const nextModifier = useCallback(
    () => dispatch(setSuggestionsModifier(order[(order.indexOf(modifier) + 1) % order.length])),
    [dispatch, modifier]
  )

  return [modifier, nextModifier] as const
}
