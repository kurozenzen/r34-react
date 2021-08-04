import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'

/**
 * A hook that simplifies usage of simple (unparameterized) Redux actions
 */
export default function useAction<T extends () => AnyAction>(actionCreator: T) {
  const dispatch = useDispatch()

  return useCallback(() => dispatch(actionCreator()), [actionCreator, dispatch])
}
