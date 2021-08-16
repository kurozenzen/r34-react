import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AnyTag } from 'r34-types'
import { TagIsActive } from '../data/types'
import { selectActiveSupertagTags, selectActiveTags } from '../redux/selectors'

export const useCheckIsActive = () => {
  const activeTags = useSelector(selectActiveTags)
  const activeSupertagsTags = useSelector(selectActiveSupertagTags)

  return useCallback(
    (tag: AnyTag): TagIsActive => {
      if (tag.name in activeTags) return 'direct'
      if (tag.name in activeSupertagsTags) return 'indirect'
      else return 'no'
    },
    [activeSupertagsTags, activeTags]
  )
}
