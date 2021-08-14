import produce from 'immer'
import { ENTER_FULLSCREEN, EXIT_FULLSCREEN, SET_FULLSCREEN_POST, AppAction } from '../actions'

export interface FullscreenState {
  isEnabled: boolean
  currentIndex: number
}

const initialFullscreenState: FullscreenState = {
  isEnabled: false,
  currentIndex: 0,
}

const enterFullscreen = (state: FullscreenState, index: number) =>
  produce(state, (draft) => {
    draft.isEnabled = true
    draft.currentIndex = index
  })

const exitFullscreen = (state: FullscreenState) =>
  produce(state, (draft) => {
    draft.isEnabled = false
  })

const setIndex = (state: FullscreenState, index: number) =>
  produce(state, (draft) => {
    draft.currentIndex = index
  })

export const fullscreen = (state: FullscreenState = initialFullscreenState, action: AppAction): FullscreenState => {
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
