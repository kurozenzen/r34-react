import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { getVersion, versionToNumber } from '../data/utils'
import middleware from './middleware'
import rootReducer from './reducers'

const version = getVersion()

const persistConfig = {
  key: 'appstate',
  version: versionToNumber(version),
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, middleware)

export const persistor = persistStore(store)
