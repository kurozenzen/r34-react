import { PersistState } from 'redux-persist'
import AppState from './redux/appState'

declare type DefaultRootState = AppState & { _persist: PersistState }
