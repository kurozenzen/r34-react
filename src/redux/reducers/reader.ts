import produce from 'immer'
import { ENTER_FULLSCREEN, EXIT_FULLSCREEN, SET_FULLSCREEN_POST, AppAction } from '../actions'

export interface ReaderState {
  isEnabled: boolean
  currentIndex: number
}

const initialReaderState: ReaderState = {
  isEnabled: false,
  currentIndex: 0,
}

const enterFullscreen = (state: ReaderState, index: number) =>
  produce(state, (draft) => {
    draft.isEnabled = true
    draft.currentIndex = index
  })

const exitFullscreen = (state: ReaderState) =>
  produce(state, (draft) => {
    draft.isEnabled = false
  })

const setIndex = (state: ReaderState, index: number) =>
  produce(state, (draft) => {
    draft.currentIndex = index
  })

const reader = (state: ReaderState = initialReaderState, action: AppAction): ReaderState => {
  switch (action.type) {
    case ENTER_FULLSCREEN:
      return enterFullscreen(state, action.postId)
    case SET_FULLSCREEN_POST:
      return setIndex(state, action.index)
    case EXIT_FULLSCREEN:
      return exitFullscreen(state)
    default:
      return state
  }
}

export default reader
