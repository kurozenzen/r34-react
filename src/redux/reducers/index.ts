import { combineReducers } from 'redux'
import preferences from './preferences'
import results from './results'
import tags from './tags'
import { fullscreen } from './fullscreen'
import likes from './likes'
import modals from './modals'
import suggestions from './suggestions'

export default combineReducers({ tags, results, preferences, fullscreen, likes, suggestions, modals })
