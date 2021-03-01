import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'
import eventLogging from './middleware/eventLogging'
import apiRequests from './middleware/apiRequests'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getVersion, versionToNumber } from '../data/utils'

const version = getVersion()

console.log(`Running version ${version} of R34 React.`)

const persistConfig = {
  key: 'appstate',
  version: versionToNumber(version),
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(eventLogging, apiRequests)))

export const persistor = persistStore(store)
