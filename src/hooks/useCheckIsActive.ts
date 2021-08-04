import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AnyTag } from '../../../r34-types'
import { selectActiveTags } from '../redux/selectors'

export const useCheckIsActive = () => {
  const activeTags = useSelector(selectActiveTags)

  return useCallback(
    (tag: AnyTag) => {
      return tag.name in activeTags
    },
    [activeTags]
  )
}
