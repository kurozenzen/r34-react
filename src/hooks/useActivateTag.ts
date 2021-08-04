import * as r34 from 'r34-types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addTag } from '../redux/actions'

export const useActivateTag = () => {
  const dispatch = useDispatch()

  return useCallback(
    (tag: r34.AnyBiasedTag) => {
      dispatch(addTag(tag))
    },
    [dispatch]
  )
}
