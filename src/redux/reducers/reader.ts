import produce from 'immer'
import { ENTER_FULLSCREEN, EXIT_FULLSCREEN, SET_FULLSCREEN_POST, AppAction } from '../actions'

export interface ReaderState {
  isEnabled: boolean
  postId: number
}

export const initialReaderState: ReaderState = {
  isEnabled: false,
  postId: 0,
}

const enterFullscreen = (state: ReaderState, postId: number) =>
  produce(state, (draft) => {
    draft.isEnabled = true
    draft.postId = postId
  })

const exitFullscreen = (state: ReaderState) =>
  produce(state, (draft) => {
    draft.isEnabled = false
  })

const setPostId = (state: ReaderState, value: number) =>
  produce(state, (draft) => {
    draft.postId = value
  })

const reader = (state: ReaderState = initialReaderState, action: AppAction): ReaderState => {
  switch (action.type) {
    case ENTER_FULLSCREEN:
      return enterFullscreen(state, action.postId)
    case SET_FULLSCREEN_POST:
      return setPostId(state, action.postId)
    case EXIT_FULLSCREEN:
      return exitFullscreen(state)
    default:
      return state
  }
}

export default reader
