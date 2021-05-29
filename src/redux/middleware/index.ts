import { applyMiddleware } from 'redux'
import analytics from './analytics'
import persistence from './persistence'
import requests from './requests'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = composeWithDevTools(applyMiddleware(analytics, requests, persistence))

export default middleware
