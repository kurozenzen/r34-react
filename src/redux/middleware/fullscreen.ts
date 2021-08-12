import { MiddlewareAPI } from 'redux'
import { Dispatch } from 'react'
import { AppAction, EXIT_FULLSCREEN } from '../actions'
import { closeFullscreen } from '../../data/browserUtils'

const fullscreen = (store: MiddlewareAPI) => (next: Dispatch<AppAction>) => async (action: AppAction) => {
  if (action.type === EXIT_FULLSCREEN) {
    // closeFullscreen()
  }

  next(action)
}

export default fullscreen
