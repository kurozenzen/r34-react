import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TagDataClass from '../data/TagDataClass'
import { removeTag, addTag } from '../redux/actions'
import { selectActiveTags } from '../redux/selectors'

/**
 * This hook allows you to add a tag to your search or remove it based on its current status.
 */
export default function useToggleTag() {
  const dispatch = useDispatch()
  const activeTags = useSelector(selectActiveTags)
  const toggleTag = useCallback(
    (tag: TagDataClass) => {
      if (tag.name in activeTags) {
        dispatch(removeTag(tag))
      } else {
        dispatch(addTag(tag))
      }
    },
    [activeTags, dispatch]
  )

  return toggleTag
}
