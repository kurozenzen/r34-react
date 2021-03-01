import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'
import eventLogging from './middleware/eventLogging'
import apiRequests from './middleware/apiRequests'
import { composeWithDevTools } from 'redux-devtools-extension'
import { versionToNumber } from '../data/utils'

console.log('Running version <', process.env.REACT_APP_VERSION, '> of R34 React.')

const persistConfig = {
  key: 'appstate',
  version: versionToNumber(process.env.REACT_APP_VERSION as string),
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(eventLogging, apiRequests)))

export const persistor = persistStore(store)
