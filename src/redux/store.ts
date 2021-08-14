import { createStore } from 'redux'
import { createMigrate, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { getVersion, versionToNumber } from '../data/utils'
import middleware from './middleware'
import { migrations } from './migrations'
import rootReducer from './reducers'

const version = getVersion()

const persistConfig = {
  key: 'appstate',
  version: versionToNumber(version),
  storage,
  migrate: createMigrate(migrations),
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, middleware)

export const persistor = persistStore(store)
