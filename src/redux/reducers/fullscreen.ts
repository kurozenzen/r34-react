import produce from 'immer'
import { ENTER_FULLSCREEN, EXIT_FULLSCREEN, SET_FULLSCREEN_POST, AppAction, SCROLL_TO_POST } from '../actions'

export interface FullscreenState {
  isEnabled: boolean
  currentIndex: number
  scrollIndex: number | null
}

const initialFullscreenState: FullscreenState = {
  isEnabled: false,
  currentIndex: 0,
  scrollIndex: null,
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

const setScrollIndex = (state: FullscreenState, index: number) =>
  produce(state, (draft) => {
    draft.scrollIndex = index
  })

export const fullscreen = (state: FullscreenState = initialFullscreenState, action: AppAction): FullscreenState => {
  switch (action.type) {
    case ENTER_FULLSCREEN:
      return enterFullscreen(state, action.postId)
    case SET_FULLSCREEN_POST:
      return setIndex(state, action.index)
    case EXIT_FULLSCREEN:
      return exitFullscreen(state)
    case SCROLL_TO_POST:
      return setScrollIndex(state, action.index)
    default:
      return state
  }
}
