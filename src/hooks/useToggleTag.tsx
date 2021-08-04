import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTag, addTag } from '../redux/actions'
import { selectActiveTags } from '../redux/selectors'
import * as r34 from 'r34-types'

/**
 * This hook allows you to add a tag to your search or remove it based on its current status.
 */
export default function useToggleTag() {
  const dispatch = useDispatch()
  const activeTags = useSelector(selectActiveTags)
  const toggleTag = useCallback(
    (tag: r34.AnyBiasedTag) => {
      if (tag.name in activeTags) {
        dispatch(removeTag(tag.name))
      } else {
        dispatch(addTag(tag))
      }
    },
    [activeTags, dispatch]
  )

  return toggleTag
}
