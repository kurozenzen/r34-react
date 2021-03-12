import { applyMiddleware } from 'redux'
import analytics from './analytics'
import requests from './requests'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = composeWithDevTools(applyMiddleware(analytics, requests))

export default middleware
